---
tags:
  - blog
  - rss
---

So I have known about RSS feeds for a while now, but I was not really sure how or why people are using it.
Why not instead just bookmark the websites you like, then reading blogs and posts in them?
This question lead me to try using RSS for myself to really see the benefits of it.

## The start of using RSS feeds

To start with RSS feeds, I just do the easiest way possible: I search on Google how to use RSS.
I remembered it recommended me something like a web extension so I used [Feedbro](https://nodetics.com/feedbro/) (a Firefox extension to read RSS).
At that time the only RSS feed I want to read is [Hacker News](https://news.ycombinator.com/), a curated sources of news from different sites.
But Hacker News itself does not have a good RSS feed.
It does not offer any kind of tag or filter to get the posts I want to read.
Then I discovered [Hacker News RSS](https://hnrss.github.io/), and it offer more customizability to the feed.
I plugged the URL <https://hnrss.org/best?points=200> (only get posts from 200 points) to Feedbro and see it pulling posts.
It was seamless, fast and easy to read with the external link and comments.
For me, the biggest benefits is that you have a central place to simply read articles you want to read.
No ads, no distractions.
This can even extend to add new RSS feeds, and you still able to use the same interface you like.
I realize I read more articles when using a RSS reader compare to using Google News.

Then came a question: Are there any great feeds to follow?
I first searched top RSS feeds to read, but they felt like they are not for me.
They have many different topics and I admit that some of them is great to read, but most of it is just irrelevant or about topics I don't have much interests.
So I try to think of where do I usually get articles recommended to me.
The source that I often get recommendations from is Google News.
I opened it and checked what is the site that the post is from.
Slowly I added up some of the popular websites that has interesting articles.

## The mobile problem

After a while, reading only on my laptop felt not enough because I spent a lot of time on my phone too.
And so the look for a RSS reader on my phone began.
I installed a bunch of different apps like [Feeder](https://github.com/spacecowboy/Feeder) (I love Free and Open Source Software) and [Feedly](https://feedly.com/).
Having imported the ompl file and then read from my phone made me realize something.
It did not sync the status of articles with my laptop.
Each platform had their own version of read and not read articles.
This made me kind of frustrating to scroll through and skip the one I already read.
Adding friction to something like reading is not a good idea so I just slowly quit reading on mobile.
But I'm not someone that give up that easily.
After reading through multiples sites and subreddits, I come up with a solution.

## Miniflux the self-host solution

Currently I stick with [Miniflux](https://miniflux.app/), a minimal feed reader, hosted on my home server.
It has the ability to combine different RSS feeds to one centralize place and do some scraper, block or rewrite contents.
You can categorize the feed and having multiple views to read the feed.
The interface may not look modern but for me it is perfect, I like minimal app.

There are also some alternative for this like [Inoreader](https://www.inoreader.com/) (this is a paid feed reader with free tier).
My motto is always trying things out before judging it so I give it a try.
All the main features seem ok but a lot of features are locked behind paywall.
One of the feature I miss from Miniflux is the ability to customize each feed on how to fetch the original article.
It really nice to choose what you want to see.
You can config it so see the whole post with the comments section.
Or simply just grab the content.
Miniflux also has a lot of integrations built-in.
If you want notifications on new posts you can also do it.

## My view about RSS

I know RSS is an old thing, not the majority of people are using it.
But just because something that has existed for a long time doesn't mean it's bad.
It does however take some work to find and setup a system that you're comfortable with.
I can see why it not the first choice for a lot of people, especially if you only want simple way to read the news.
You can easily subscribe to a newsletter and read it with your favorite email client.
But the point is: **You're in control**.
With RSS reader, you have the choice to choose which site you want to read, and slowly build up your feeds with "almost" no ads.[^1]
Near the time I write this blog there is a post on Hacker News about [RSS.Social](https://news.ycombinator.com/item?id=46700503).
Posts like these make me even more believe that RSS is still doing greater than ever.

Overall I am happy with my current setup and will still continue to find new ways to do things.
The unread number just keep increasing but that is fine
Using RSS reader just make me love reading more and I believe it inspires me to write something like this blog.
I hope by reading this blog it also inspires you to try out new things :>

## My feeds suggestion

### Here are some of the feeds I'm following:

1. [Hacker News RSS](https://hnrss.org/best?points=200)
2. [Jeff Geerling Blog](https://www.jeffgeerling.com/)
3. [Lalit Maganti Blog](https://lalitm.com/)
4. [Susam Pal Blog](https://susam.net/)

### Blogs that inspires me to write this blog:

- [Writing first, tooling second](https://susam.net/writing-first-tooling-second.html)
- [No, RSS isn’t dead!](https://andrewblackman.net/2025/05/no-rss-isnt-dead/)

### Links to discover small publishers:

- [Kagi Smallweb](https://kagi.com/smallweb)
- [RSS.Social](https://rss.social/)
- [minifeed](https://minifeed.net/global)

Thanks for reading and if you have any suggestions please send it to me by mail tamthai.de@gmail.com or comments below (not available but hopefully soon :>)

# Footnotes

[^1]: Some big sites (like dev.to) still send ads through RSS, but you can setup rules to filter that. Or just don't bother follow those sites.
