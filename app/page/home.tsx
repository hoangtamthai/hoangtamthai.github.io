import { Download, ExternalLinkIcon } from "lucide-react";
import { Link } from "react-router";
import Header from "../components/section/header";
import { Button } from "../components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import Typography from "../components/ui/typography";
import Shape from "../components/visuals/shape";
import { Badge } from "../components/ui/badge";

export default function HomePage() {
  const contacts = [
    {
      url: "https://facebook.com/thaihoangtam.306",
      alt: "My Facebook",
      src: "images/icon/FacebookIcon.png",
    },
    {
      url: "https://instagram.com/hoangtamthai/",
      alt: "My instagram",
      src: "images/icon/InstagramIcon.png",
    },
    {
      url: "https://linkedin.com/in/hoangtamthai",
      alt: "My linkedin",
      src: "images/icon/LinkedinIcon.png",
    },
    {
      url: "https://github.com/hoangtamthai",
      alt: "My Github",
      src: "images/icon/GithubIcon.png",
    },
  ];
  const projects = [
    {
      url: "https://beestudious.org",
      alt: "Beestudious website",
      src: "./images/project-thumbnail/Beestudious.png",
      title: "Beestudious",
    },
    {
      url: "https://github.com/hoangtamthai/StockPrediction",
      alt: "StockPrediction",
      src: "./images/project-thumbnail/StockPrediction.png",
      title: "Stock Prediction",
    },
    {
      url: "https://github.com/hoangtamthai/VoiceAI",
      alt: "VoiceAI",
      src: "./images/project-thumbnail/VoiceAI.jpeg",
      title: "VoiceAI",
    },
    {
      url: "https://github.com/hoangtamthai/VGU-License-Detection",
      alt: "License Detection",
      src: "https://raw.githubusercontent.com/hoangtamthai/VGU-License-Detection/main/static/large/detected_large_03.jpg",
      title: "License Detection",
    },
    {
      url: "https://github.com/HuMiTriet/VGU_Project_Berlin",
      alt: "License Detection",
      src: "../images/project-thumbnail/Dashboad.png",
      title: "Real As-stated",
    },
    {
      url: "https://github.com/HuMiTriet/VGU-Eureka",
      alt: "License Detection",
      src: "../images/project-thumbnail/Etoet.png",
      title: "Etoet",
    },
    {
      url: "https://github.com/hoangtamthai/TimeScheduler",
      alt: "TimeScheduler",
      src: "https://raw.githubusercontent.com/hoangtamthai/TimeScheduler/main/Tisch/src/main/resources/TimeSchedulerIcon.png",
      title: "Time Scheduler",
    },
  ];
  const albums = [
    {
      url: "https://photos.app.goo.gl/h67XSKMrjjwkGKDi7",
      alt: "Food",
      src: "../images/album-thumbnail/IMG_20211205_130542.jpg",
      title: "Food Eaten/Made in Germany",
    },
    {
      url: "https://photos.app.goo.gl/QuVkBAJDW76ZYvQi7",
      alt: "Heidelberg - Stuttgart - Ulm - Lindau 06.06.25",
      src: "images/album-thumbnail/IMG_20250609_112444.jpg",
      title: "Heidelberg - Stuttgart - Ulm - Lindau 06.06.25",
    },
    {
      url: "https://photos.app.goo.gl/hRcs2GVyCvBRigmA6",
      alt: "Hamburg",
      src: "images/album-thumbnail/IMG_20220202_162401.jpg",
      title: "Hamburg 01.02.22",
    },
    {
      url: "https://photos.app.goo.gl/hPHLwBn6NZsfimPs7",
      alt: "New Year Eve",
      src: "../images/album-thumbnail/IMG_20220101_000600.jpg",
      title: "New Year Eve 31.12.21",
    },
    {
      url: "https://photos.app.goo.gl/X1BdpdS1vvXKjAJ87",
      alt: "BBQ",
      src: "../images/album-thumbnail/IMG_20211225_143454.jpg",
      title: "Christmas & BBQ 25.12.21",
    },
    {
      url: "https://photos.app.goo.gl/BrFWzqLHkJUCLfDeA",
      alt: "Christmas Eve",
      src: "../images/album-thumbnail/IMG_20211224_232235.jpg",
      title: "Christmas Eve 24.12.21",
    },
    {
      url: "https://photos.app.goo.gl/Rq6BJJSzv2HB3qo19",
      alt: "Bad Vilbel",
      src: "../images/album-thumbnail/IMG_20211219_114951.jpg",
      title: "Bad Vilbel 19.12.21",
    },
    {
      url: "https://photos.app.goo.gl/vhHfa6T5HDc24XSb9",
      alt: "Ice skating",
      src: "../images/album-thumbnail/IMG_20211212_110031.jpg",
      title: "Alter Schießplatz & Ice Skating 12.12.21",
    },
    {
      url: "https://photos.app.goo.gl/LtAHGM1ftsuCSbHd8",
      alt: "Paris, Luxembourg & Stuttgart",
      src: "../images/album-thumbnail/IMG_20211119_124113.jpg",
      title: "Paris, Luxembourg & Stuttgart 18.11.21",
    },
    {
      url: "https://photos.app.goo.gl/rUp66zDyBmx5YqvH9",
      alt: "Berlin",
      src: "../images/album-thumbnail/IMG_20211111_205520.jpg",
      title: "Berlin 11.11.21",
    },
    {
      url: "https://photos.app.goo.gl/Z24vsuW84kYV14nv5",
      alt: "Heidenberg",
      src: "../images/album-thumbnail/IMG_20211023_154550.jpg",
      title: "Heidenberg 23.10.21",
    },
    {
      url: "https://photos.app.goo.gl/w3aaEwPMHPEs7Fgq9",
      alt: "Großer Feldberg",
      src: "../images/album-thumbnail/IMG_20211016_151809.jpg",
      title: "Großer Feldberg 16.10.21",
    },
  ];
  return (
    <div className="mx-12 md:mx-42 lg:mx-60 dark:bg-black">
      <div id="/" className="h-20"></div>
      <div className="pb-5">
        <Typography variant={"h2"}>Nice to meet you :3</Typography>
        <Typography variant={"h2"}>
          Take a look around to know more about me. I took a lot of photos and
          videos in Europe and you can see them in the Media section. Enjoy this
          zenful animation.
        </Typography>
      </div>
      <Shape></Shape>

      <div id="about" className="h-24"></div>

      <Typography variant={"h1"}>About me</Typography>
      <div className="h-6"></div>
      <div className="lg:grid lg:grid-cols-3">
        <div className="gap-2 lg:col-span-2 lg:flex lg:grow-[2] lg:flex-col lg:justify-around">
          <Typography className="lg:pr-5" variant={"p"}>
            Hey, I am Tam from{" "}
            <span className="bg-gradient-to-r from-red-600 from-30% via-yellow-500 to-red-600 bg-clip-text text-transparent">
              Vietnam
            </span>
            , based in{" "}
            <span className="bg-gradient-to-r from-black via-red-600 to-yellow-500 bg-clip-text text-transparent">
              Germany
            </span>
            . Currently I am a Master's Student in Computer Science at Technical
            University of Darmstadt with a focus on Distributed Computing. I
            have graduated with an excellent degree in Computer Science student
            at Vietnamese-German University.
          </Typography>
          <div className="mt-2">
            <Typography variant={"h2"} className="text-center">
              Skills
            </Typography>
            <div className="flex justify-center">
              <Badge variant="outline" className="mr-2 mb-2">
                Java
              </Badge>
              <Badge variant="outline" className="mr-2 mb-2">
                Spring Boot
              </Badge>
              <Badge variant="outline" className="mr-2 mb-2">
                TypeScript
              </Badge>
              <Badge variant="outline" className="mr-2 mb-2">
                ReactJS
              </Badge>
            </div>
          </div>
          <div className="h-2 sm:hidden"></div>
          <div>
            <Typography variant={"h2"} className="text-center">
              Contacts
            </Typography>
            <div className="flex flex-row flex-wrap justify-center gap-5 pb-5">
              {contacts.map((contact) => {
                return (
                  <Link key={contact.url} target="_blank" to={contact.url}>
                    <img alt={contact.alt} src={contact.src} width="50"></img>
                  </Link>
                );
              })}
              <Button
                variant={"outline"}
                className="my-auto flex justify-center"
              >
                <a
                  className="bg-gray w-fit text-center"
                  href="/pdf/Resume.pdf"
                  download="Resume"
                >
                  Resume <Download className="inline" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <img
          src="images/personal.jpg"
          className="mx-auto h-full w-fit rounded-lg object-cover lg:col-span-1 lg:grow-[1]"
        />
      </div>

      <div id="experience" className="h-24"></div>
      <Typography variant={"h1"}>Experience</Typography>
      <Typography variant={"p"}>
        I have worked at{" "}
        <Link
          to="https://unit.com.vn/"
          target="_blank"
          className="hover:cursor text-blue-500 underline"
        >
          UNIT Technology Corporation <ExternalLinkIcon className="inline" />
        </Link>{" "}
        for about 2 years as a Java Software Developer. I am also the creator of
        the website for{" "}
        <Link
          to="https://beestudious.org"
          target="_blank"
          className="hover:cursor text-yellow-500 underline"
        >
          Beestudious <ExternalLinkIcon className="inline" />
        </Link>
        .
      </Typography>

      <div id="projects" className="h-24"></div>
      <Typography variant={"h1"}>Projects</Typography>
      <Typography variant={"p"}>
        These are my projects that I made by myself or with some of my friends.
        If you find them interesting leave a star at GitHub. Thank you :&gt;
      </Typography>
      <div className="h-6"></div>
      <Carousel>
        <CarouselContent>
          {projects.map((project) => {
            return (
              <CarouselItem
                key={project.url}
                className="flex flex-col justify-between gap-5 lg:basis-1/3"
              >
                <div></div>
                <a href={project.url} target="_blank">
                  <img
                    alt={project.alt}
                    className="mx-auto h-52 rounded-xl"
                    src={project.src}
                  />
                </a>
                <Typography variant={"h4"} className="text-center">
                  {project.title}
                </Typography>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex flex-row flex-wrap justify-around gap-16"></div>

      <div id="media" className="h-24"></div>
      <Typography variant={"h1"}>Media</Typography>
      <Typography variant={"p"}>
        Here are some of my albums from trips around Europe
      </Typography>
      <Carousel className="pt-6">
        <CarouselContent>
          {albums.map((album) => {
            return (
              <CarouselItem key={album.url} className="lg:basis-1/3">
                <a href={album.url} target="_blank">
                  <img className="rounded-lg" src={album.src} alt={album.alt} />
                </a>
                <Typography variant={"h4"} className="text-center">
                  {album.title}
                </Typography>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </div>
  );
}
