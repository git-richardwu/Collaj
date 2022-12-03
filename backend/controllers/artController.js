const Art = require('../models/artModel');
const mongoose = require('mongoose');
const Vibrant = require('node-vibrant');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function convert(r, g, b){
    r /= 255, g /= 255, b /= 255;
    let cMin = Math.min(r, g, b), cMax = Math.max(r, g, b);
    let delta = cMax - cMin;
    let h = 0, s = 0, l = 0;
    if (delta == 0) {
        h = 0;
    }
    else if (cMax == r) {
      h = ((g - b) / delta) % 6;
    }
    else if (cMax == g) {
      h = ((b - r) / delta) + 2;
    }
    else {
      h = ((r - g) / delta) + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) {
        h += 360;
    }
        l = (cMax + cMin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
    return [h, s, l];
}

const getAllArt = async (req, res) => {
    const userID = req.user._id;
    try {
        const allArt = await Art.find({userID});
        res.status(200).json(allArt);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

const addArt = async (req, res) => {
    const { source, pieceIndex, artSite } = req.body;
    console.log('launch')
    const browser = await puppeteer.launch({ headless: true });
    const retrieve = [];
    const index = pieceIndex ? pieceIndex.toString() : 1;
    console.log('addArt')
    try {
        const page = await browser.newPage();
        console.log('new page')
        await page.goto(source, {
            waitUntil: 'load',
            timeout: 0
        });
        console.log('arrived at source')
        let filteredImages = [], artLink = "", artTitle = "", artistName = "";
        if (artSite == "Artstation") {
            await page.waitForSelector('.project-assets-list img');
            console.log('await selector')
            const images = await page.evaluate(() => Array.from(document.querySelectorAll('.project-assets-list img'), (e) => ({
                artLinkText: e.src, //source
                artTitleText: e.alt //title
            })));
            console.log('images loaded')
            await page.waitForSelector('.img-circle');
            artistName = await page.$eval('.img-circle', el => el.alt);
            console.log('img circle loaded')
            filteredImages = images.filter(image => image.artTitleText != '4k');
            artLink = filteredImages[index - 1].artLinkText;
            artTitle = filteredImages[index - 1].artTitleText;
        }
        else if (artSite == "Twitter") {
            await page.waitForSelector('.css-9pa8cd');
            const images = await page.evaluate(() => Array.from(document.querySelectorAll('.css-9pa8cd'), (e) => ({
                artLinkText: e.src,
                forFiltering: e.alt
            })));
            await page.waitForSelector('span .css-901oao');
            const fetchArtist = await page.evaluate(() => Array.from(document.querySelectorAll('span .css-901oao'), (e) => ({
                artistNameText: e.textContent
            })));
            await page.waitForSelector('meta');
            const fetchTitle = await page.evaluate(() => Array.from(document.querySelectorAll('meta'), (e) => ({
                artTitleText: e.content
            })));
            filteredImages = images.filter(image => image.forFiltering == 'Image');
            let split = filteredImages[index - 1].artLinkText.split("name=");
            split[1] = "name=large";
            artLink = split.join('');
            artistName = fetchArtist[2].artistNameText;
            if (fetchTitle[fetchTitle.length - 8].artTitleText.startsWith("\“https://")) {
                artTitle = " "
            }
            else {
                artTitle = fetchTitle[fetchTitle.length - 8].artTitleText.slice(1, -1); //remove quotations
            }
        }
        const vibrantRGB = new Vibrant(artLink).getPalette().then((palette) => {
            return palette.Vibrant.rgb;
        })
        const temp = await vibrantRGB;
        const color = await convert(temp[0], temp[1], temp[2]);
        if (color[0] >= 345) {
            color[0] = 360 - color[0];
        }
        retrieve.push(artTitle, artistName, artLink, color); //title, artist, artLink, dominantColor
    } catch (err) {
        console.log('puppeteer failure')
        console.error(err.message);
    } finally {
        await browser.close();
    }
    try {
        const title = retrieve[0];
        const artist = retrieve[1];
        const imageLink = retrieve[2];
        const dominantColor = retrieve[3];
        const pieceIndex = index;
        const userID = req.user._id;
        const artwork = await Art.create({ userID, title, artist, source, imageLink, pieceIndex, dominantColor });
        res.status(200).json(artwork);
    } catch (error) {
        console.log('art creation failure')
        res.status(400).json({error: error.message});
    }
}
const deleteArt = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'ID is not valid.'});
    }
    try {
        const ArtofID = await Art.findByIdAndDelete(id);
        if (!ArtofID) {
            return res.status(404).json({error: 'Art does not exist.'});
        }
        return res.status(200).json(ArtofID);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getAllArt,
    addArt,
    deleteArt
};