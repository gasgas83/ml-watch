import fs from 'fs'

fs.readFile("./dist/index.html", 'utf8', function (error, html) {
    if (error) {
        throw error;
    }

    const getBodyContent = (html) => {
        const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        return match ? match[1] : null;
    }

    let getHrefFromLinkTag = (html) => {
        const regex = /<link[^>]*\brel="stylesheet"[^>]*\bhref="([^"]+)"[^>]*>/i;
        const match = html.match(regex);
        return match ? match[1] : null;
    }

    let getHrefFromScriptTag = (html) => {
        const regex = /<script[^>]*\btype="module"[^>]*\bcrossorigin[^>]*\bsrc="([^"]+)"[^>]*>/i;
        const match = html.match(regex);
        return match ? match[1] : null;
    }

    let formattedHTML = getBodyContent(html)
    let getCSSPath = getHrefFromLinkTag(html)
    let getJSPath = getHrefFromScriptTag(html)

    let cssLink = `<link rel="stylesheet" type="text/css" href="${getCSSPath}" as="style"/>`
    let jsCode = `<script> 
    window.addEventListener("DOMContentLoaded", function (event) {
        var vueScript = document.createElement("script");
        vueScript.type = "module";
        vueScript.src = "${getJSPath}";
        document.body.appendChild(vueScript);
        
        //ARC Header black HACK//
        var headerClass = document.querySelector(".ln-main-header");
        headerClass.classList.add("--negative");
    
    });
    </script>
     `
    formattedHTML = cssLink + formattedHTML + jsCode;
    let splitCode = formattedHTML.split('<!-- END CIRITICAL CSS -->')

    let dir = './nota-ln'
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }


    fs.writeFile("./nota-ln/01-critical-css.html", splitCode[0], function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file critical-css.html was saved!");
    });

    fs.writeFile("./nota-ln/02-body.html", splitCode[1], function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file body.html was saved!");
    });


});
