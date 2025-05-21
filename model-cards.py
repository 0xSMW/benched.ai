# ```
# create a puppeteer script that will get the content from div id
#
# for each model name in src/content/models
#
# it needs to browse to https://gemini.google.com/
#
# enter this into the prompt box
# class ql-editor ql-blank textarea new-input-ui
# with data-placeholder="Ask Gemini"
#
# the prompt is "create a detailed technical blog for" and append the model name to the end of the prompt
#
# then click button with div inside saying deep Deep Research 
#
# wait for the content to load 
#
# then click the button with the aria label "Start research"
#
# wait for the content to load
#
# get the content from div id
# extended-response-markdown-content
#
# and save it to a markdown file
# ```

try:
    from playwright.async_api import async_playwright
except ImportError:
    print("Playwright is not installed. Please install it by running:")
    print("  pip install playwright")
    print("Then, install the necessary browser drivers with:")
    print("  playwright install")
    exit(1)

import asyncio
import os

async def get_model_research(model_name: str, playwright_instance):
    """Fetches research content for a given model name using Gemini."""
    page = await playwright_instance.new_page()
    try:
        print(f"Processing model: {model_name}")
        await page.goto("https://gemini.google.com/")

        # Wait for the prompt box to be visible and then fill it
        prompt_box_selector = 'div.ql-editor.ql-blank[data-placeholder="Ask Gemini"]'
        await page.wait_for_selector(prompt_box_selector, timeout=60000)  # Increased timeout
        await page.fill(prompt_box_selector, f"create a detailed technical blog for {model_name}")

        # Click the "Deep Research" button
        # Using a more robust selector for the "Deep Research" button
        deep_research_button_selector = 'button:has-text("Deep Research")'
        try:
            await page.wait_for_selector(deep_research_button_selector, timeout=10000)
            await page.click(deep_research_button_selector)
        except Exception as e:
            print(f"Could not find or click 'Deep Research' button for {model_name}: {e}")
            # Fallback: try to find a button that might be the send/submit button if deep research isn't there
            send_button_selector = 'button[aria-label="Send message"]' # Common aria-label for send
            try:
                await page.wait_for_selector(send_button_selector, timeout=5000)
                await page.click(send_button_selector)
                print(f"Clicked generic send button for {model_name} as fallback.")
            except Exception as send_e:
                print(f"Could not find or click any send/research button for {model_name}: {send_e}")
                await page.screenshot(path=f"error_{model_name}_send_button.png")
                return


        # Click the "Start research" button
        start_research_button_selector = 'button[aria-label="Start research"]'
        try:
            await page.wait_for_selector(start_research_button_selector, timeout=30000) # Wait for button to appear
            await page.click(start_research_button_selector)
        except Exception as e:
            print(f"Could not find or click 'Start research' button for {model_name}: {e}")
            print("Attempting to check if research content is already available or if it's a different flow.")
            # It's possible the flow changed or the content is already there.
            # Let's try to get the content directly. If not found, then it's a real issue.


        # Wait for the content to load and extract it
        content_selector = "div#extended-response-markdown-content"
        try:
            await page.wait_for_selector(content_selector, timeout=300000)  # 5 minutes for content generation
            content = await page.inner_html(content_selector)
        except Exception as e:
            print(f"Could not find content for {model_name} after 5 minutes: {e}")
            await page.screenshot(path=f"error_{model_name}_content.png")
            return

        # Save the content to a markdown file
        output_dir = "research_output"
        os.makedirs(output_dir, exist_ok=True)
        file_path = os.path.join(output_dir, f"{model_name.replace(' ', '_').replace('/', '_')}.md")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Successfully saved research for {model_name} to {file_path}")

    except Exception as e:
        print(f"An error occurred while processing {model_name}: {e}")
        await page.screenshot(path=f"error_{model_name}_general.png")
    finally:
        await page.close()

async def main():
    models_dir = "src/content/models"
    model_files = [f for f in os.listdir(models_dir) if f.endswith(".mdx")]

    if not model_files:
        print(f"No .mdx files found in {models_dir}")
        return

    async with async_playwright() as p:
        print("Launching browser for initial login...")
        print("Please log in to your Google account in the browser window that opens.")
        print("After you have successfully logged in, press Enter in this terminal to continue...")
        # Launch browser in non-headless mode for the first run / login
        # Trying Firefox as Chromium was flagged as insecure by Google
        try:
            browser = await p.firefox.launch(headless=False)
        except Exception as e:
            print(f"Failed to launch Firefox: {e}")
            print("Please ensure Firefox is installed and you have run 'playwright install firefox'.")
            print("Falling back to Chromium, which may have login issues.")
            try:
                browser = await p.chromium.launch(headless=False)
            except Exception as e_chromium:
                print(f"Failed to launch Chromium as well: {e_chromium}")
                print("Please ensure you have run 'playwright install'.")
                return

        login_page = await browser.new_page()
        await login_page.goto("https://gemini.google.com/") # Go to a relevant page for login
        print("Waiting for you to press Enter after logging in...")
        await asyncio.to_thread(input) # Pauses async execution until Enter is pressed
        await login_page.close() # Close the dummy/login page
        print("Login complete, proceeding with model research...")

        # Limit concurrent tasks to avoid overwhelming the system or the website
        semaphore = asyncio.Semaphore(1) # Process 1 model concurrently after login for stability with UI

        tasks = []
        for model_file in model_files:
            model_name = model_file.replace(".mdx", "")
            formatted_model_name = model_name.replace("-", " ") 
            tasks.append(bounded_gather_model_research(model_name, formatted_model_name, browser, semaphore))
        
        await asyncio.gather(*tasks)
        await browser.close()

async def bounded_gather_model_research(original_model_name: str, formatted_model_name: str, browser, semaphore):
    async with semaphore:
        await get_model_research(formatted_model_name, browser)


if __name__ == "__main__":
    asyncio.run(main())

