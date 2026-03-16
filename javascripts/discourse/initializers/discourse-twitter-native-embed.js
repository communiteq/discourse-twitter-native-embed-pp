import { withPluginApi } from "discourse/lib/plugin-api";
import { i18n } from "discourse-i18n";

export default {
    name: "discourse-twitter-native-embed",
    initialize() {
        withPluginApi("1.0.0", api => {

            function getTwitterScript() {
                var scriptnode = document.createElement("script");
                scriptnode.setAttribute("async", "")
                scriptnode.setAttribute("src", "https://platform.twitter.com/widgets.js");
                scriptnode.setAttribute("charset", "utf-8");
                document.head.appendChild(scriptnode);
            }

            api.decorateCookedElement((el, helper) => {
                let hasQuote = false;
                for (const the_musks_fxxking_url of ["twitter.com", "x.com"]) {
                    for (const aa of el.querySelectorAll(`a.onebox[href^="https://${the_musks_fxxking_url}/"][href*=status]`)) {
                        const twitter_blockquoue = document.createElement("blockquote");
                        twitter_blockquoue.setAttribute("style", "display: none");
                        twitter_blockquoue.classList?.add("twitter-tweet");
                        const aaa = document.createElement("a");
                        aaa.setAttribute("href", aa.href.replaceAll("https://x.com", "https://twitter.com"));
                        aaa.setAttribute("rel", "no-follow");
                        twitter_blockquoue.appendChild(aaa);
                        aa.appendChild(twitter_blockquoue);
                    }
                }
                for (const aa of el.querySelectorAll("aside.onebox.twitterstatus")) {
                    const twitter_blockquote = document.createElement("blockquote");
                    twitter_blockquote.classList?.add("twitter-tweet");
                    const aaa = document.createElement("a");
                    const href = aa.getAttribute("data-onebox-src").replaceAll("https://x.com", "https://twitter.com")
                    aaa.setAttribute("href", href);
                    aaa.setAttribute("rel", "no-follow");
                    twitter_blockquote.appendChild(aaa);
                    aa.appendChild(twitter_blockquote);

                    const loadingEl = document.createElement("p");
                    loadingEl.innerHTML = i18n(themePrefix("loading_tweet"), { href: href });
                    twitter_blockquote.appendChild(loadingEl);
                    for (const oldEl of aa.querySelectorAll("header.source, article.onebox-body")) {
                        oldEl.setAttribute("style", "display: none");
                    }
                }

                for (const quote of el.getElementsByTagName("blockquote")) {
                    if (quote.querySelector(`blockquote a[href^="https://twitter.com/"]`)) {
                        quote.classList?.add("twitter-tweet");
                        hasQuote = true;
                    }
                }
                if (hasQuote) {
                    getTwitterScript();
                }
            }, {
                id: "discourse-twitter-native-embed",
                afterAdopt: true,
                onlyStream: true,
            });

        });
    }
};

