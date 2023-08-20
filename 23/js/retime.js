/**
 * Lemma's Fancy Vanilla.js Date-Time Formatting Script!
 * I'm actually pretty proud of this since I'm not a JS programmer lmao
 * 
 *  Available under MIT if you want to use this on your site!
 * 
 * How to use:
 * 1. Create a <time> element somewhere in your code
 * 2. Set the `datetime` property to be the ISO-8601 time code you want to use!
 * 3. Your time will be automatically formatted for everyone who visits the site! :tada:
 * 4. If you set `datestyle` or `timestyle` attributes on the tag, they'll be applied automatically!
 * 
 * Technical details to note:
 * - As-is, this formats in short date and time style. Feel free to change them as you see fit!
 * - This uses `navigator.language`, which may not always update for the current lang the user has picked.
 * 
 * For legal values in `default_options`, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#parameters
 * 
 * Enjoy!
 */
// function retime() {
const default_options = { dateStyle: "short", timeStyle: "short" }; //Edit me for default config!
const timestamps = document.getElementsByTagName("time");
for (let i = 0; i < timestamps.length; i++) { //Sadly, I can't just iterate through using a for-in...
    const elem = timestamps.item(i); //Because I've gotta do this to get the actual item!
    const date = new Date(elem.getAttribute("datetime"));
    let options = {
        ...default_options
    };
    if (elem.hasAttribute("datestyle")) {
        val = elem.getAttribute("datestyle");
        if (val == "none") {
            delete options.dateStyle;
        } else {
            options["dateStyle"] = val;
        }
    }
    if (elem.hasAttribute("timestyle")) {
        val = elem.getAttribute("timestyle");
        if (val == "none") {
            delete options.timeStyle;
        } else {
            options["timeStyle"] = val;
        }
    }
    elem.innerHTML = date.toLocaleString(navigator.language, options);
}

//automatically mark localization!
const timezones = document.getElementsByClassName("timezone");
for (let i = 0; i < timezones.length; i++) {
    const elem = timezones.item(i);
    //Hi! This sucks!
    //We mark the user's local time zone to make it clear which one it refers to,
    //But there's no good way to actually get that directly with vanilla JS,
    //So I'm stuck doing this kludge-y mess to get the user's timezone code instead.
    //Thanks, JavaScript! What a good and useful language with many helpful APIs and no dependency problems whatsoever!
    elem.innerHTML = "(" + new Date().toLocaleTimeString("en-US", { timeZoneName: 'short' }).split(' ')[2] + ")";
}
// }

//run it at the right time, wheeeee
// document.addEventListener("DOMContentLoaded", retime);