const puppeteer = require('puppeteer');

module.exports.scraper = async (req,res)=>{
  const browser = await puppeteer.launch({headless:'new'});

  try {
    
    const url = req.body.url;
  
    // Create a new page
    const page = await browser.newPage();
  
    // Navigate to the web page
    await page.goto(url);
  
    // Extract the <a> tags from the page
    const links = await page.evaluate(() => {
      const anchorElements = document.querySelectorAll('a');
      const linkData = [];
      anchorElements.forEach(anchor => {
        linkData.push({
          href: anchor.getAttribute('href'),
          text: anchor.textContent
        });
      });
      return linkData;
    });
  
    // Close the browser
    await browser.close();

    // console.log(links);

    const ebayLinks = links.filter(link => {
      try {

        const splitted = link.href.split("/");

        if(splitted[2]==="www.ebay.com" && splitted[3]==='itm' || splitted[2]==="www.ebay.com" && splitted[3]==='p' ){
          return true;
        }else{
          return false;
        }

      } catch (error) {
        return false; // Handle invalid URLs
      }
    });

    res.status(200).json({ ebayLinks });

    
  } catch (error) {
    await browser.close();
    return res.send(400);
  }
  
}

