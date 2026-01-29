---
tags:
  - blog
  - rss
  - self-hosting
---

I have been aware of RSS feeds for a while now, but I was not entirely sure how or why people use them.
Why not instead just bookmark the websites you like, then read blogs and posts in them?
That question eventually led me to try RSS for myself to see if I was missing out.
It turns out, I was.

## My first RSS feed

To start with RSS feeds, I just do the easiest way possible: I search on Google how to use RSS.
I remembered it recommended something like a web extension, so I used [Feedbro](https://nodetics.com/feedbro/) (a Firefox extension to read RSS).
At that time, the only RSS feed I wanted to follow was [Hacker News](https://news.ycombinator.com/), a curated source of news mainly about tech from different sites.
But Hacker News itself does not have a good RSS feed.
It does not offer any kind of tag or filter to get the posts I want to read.
Then I discovered [Hacker News RSS](https://hnrss.github.io/), and it offers more customizability to the feed.
I plugged the URL <https://hnrss.org/best?points=200> (only get posts from 200 points) into Feedbro and saw it pulling posts.
It was seamless, fast, and easy to read with the external link and comments.
For me, the biggest benefit is that you have a central place to simply read articles you want to read.
No ads, no distractions.
This can even extend to add new RSS feeds, and you are still able to use the same interface you like.
I realize I read more articles when using an RSS reader compared to using Google News.

Then came a question: Are there any great feeds to follow?
I first searched top RSS feeds to read, but they felt like they were not for me.
They have many different topics, and I admit that some of them are great to read, but most of them are just irrelevant or about topics I don't have much interest in.
So I try to think of where I usually get articles recommended to me.
The source that I often get recommendations from is Google News and great blogs from Hacker News.
I started checking the source websites of the articles I enjoyed and manually adding them to my feed list.

## The mobile problem

After a while, reading only on my laptop was not enough because I spent a lot of time on my phone too.
And so the search for an RSS reader on my phone began.
I installed a bunch of different apps like [Feeder](https://github.com/spacecowboy/Feeder) (since I love Free and Open Source Software) and [Feedly](https://feedly.com/).

But after importing my OPML file, I ran into a major friction point: **Syncing**.

It did not sync the status of articles with my laptop.
Each platform had its own version of read and unread articles.
This made me kind of frustrated to scroll through and skip the one I already read.
Adding friction to something like reading is not a good idea, so I just slowly quit reading on mobile.
But I'm not someone who gives up that easily.
After reading through multiple sites and subreddits, I came up with a solution.

## Miniflux: the self-host solution

Currently, I stick with [Miniflux](https://miniflux.app/), a minimal self-hosted feed reader, which I host on my own home server.
Miniflux is perfect for my needs.
While the interface is not modern, I like its minimalistic aesthetic.

Why I chose Miniflux over other alternatives:

- **Full-Text Fetching:** I can configure it to grab the entire post (including comments) even if the RSS feed only provides a snippet.
- **Privacy & Control:** I own the data.
- **Integrations:** It works perfectly with **ntfy.sh**, so I get a notification on my phone the moment a popular post hits Hacker News.
- **Customization:** Unlike [Inoreader](https://www.inoreader.com/) (which locks great features behind a paywall), Miniflux lets me customize how to fetch the original article for every feed.

On mobile, you can read directly with Miniflux on the phone's web browser.
Or a nicer way to read posts is with the open source app [ReadYou](https://github.com/ReadYouApp/ReadYou).
It can connect with Miniflux through the Fever API or Google Reader API from the integrations setting.
The UX feels a lot better, and swiping through posts feels really nice. I would highly recommend you try it if you haven't.

## My view about RSS

I know RSS is an old thing and not the majority of people are using it.
But just because something that has existed for a long time doesn't mean it's bad.
It does take some work to find and set up a system that you're comfortable with.
I can see why it's not the first choice for a lot of people, especially if you only want a simple way to read the news.
You can easily subscribe to a newsletter and read it with your favorite email client.

But the point with RSS is: **You're in control**.

With an RSS reader, you have the choice to choose which site you want to read with "almost" no ads.[^1]
At first, the reading list can be empty.
But after adding more feeds, you can slowly build up your list.
Near the time I write this blog, there is a post on Hacker News about [RSS.Social](https://news.ycombinator.com/item?id=46700503).
Posts like these make me even more believe that RSS is still doing better than ever.

Overall, I am happy with my current setup and will still continue to find new ways to do new things.
The unread number just keeps increasing, but that is fine.
Just read when you have the time.

**My Advice:** Don't let the "Unread" numbers give you FOMO.
Read when you have time.

Using an RSS reader just makes me love reading more, and I believe it inspires me to write something like this blog.
I hope by reading this blog it also inspires you to try out new things :>

## My feeds suggestion

### Here are some of the feeds I'm following:

1. [Hacker News RSS](https://hnrss.org/best?points=200)
2. [Jeff Geerling Blog](https://www.jeffgeerling.com/)
3. [Lalit Maganti Blog](https://lalitm.com/)
4. [Susam Pal Blog](https://susam.net/)

### Blogs that inspire me to write this blog:

- [Writing first, tooling second](https://susam.net/writing-first-tooling-second.html)
- [No, RSS isn’t dead!](https://andrewblackman.net/2025/05/no-rss-isnt-dead/)

### Links to discover small publishers:

- [Kagi Smallweb](https://kagi.com/smallweb)
- [RSS.Social](https://rss.social/)
- [minifeed](https://minifeed.net/global)

Thanks for reading, and if you have any suggestions, please send them to me by email tamthai.de@gmail.com or leave comments below (not available but hopefully soon :>)

## Footnotes

[^1]: Some big sites (like dev.to) send "ad-like" posts (e.g., Top 10 sites to buy account...) through RSS. You can set up rules to filter that if you want. Or just don't bother following those sites.
