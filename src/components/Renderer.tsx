import clsx from "clsx";
import { FC, useMemo, useState } from "react";
import { FaMusic } from "react-icons/fa";
import { imgClass, isUtteringClass } from "./Renderer.css";

type HeadingArticleData = {
  type: "heading";
  text: string;
};

type ParagraphArticleData = {
  type: "paragraph";
  text: string;
};

type ImageArticleData = {
  type: "image";
  src: string;
  text: string;
};

type ArticleData = ParagraphArticleData | ImageArticleData | HeadingArticleData;

export type Article = {
  locale: string;
  data: ArticleData[];
};

type Props = {
  article: Article;
  synth: SpeechSynthesis;
  voices: SpeechSynthesisVoice[];
};

const Heading: FC<{ data: HeadingArticleData }> = (props) => {
  return <h2>{props.data.text}</h2>;
};

const Paragraph: FC<{ data: ParagraphArticleData }> = (props) => {
  return <p>{props.data.text}</p>;
};

const Image: FC<{ data: ImageArticleData }> = (props) => {
  return (
    <div>
      <img alt={props.data.text} className={imgClass} src={props.data.src} />
      <div>{props.data.text}</div>
    </div>
  );
};

const renderables = {
  heading: Heading,
  paragraph: Paragraph,
  image: Image
};

const Renderer: FC<Props> = ({ synth, article, voices }) => {
  const availableVoices = voices.filter((v) => {
    return v.lang.startsWith(article.locale);
  });

  const [selectedVoice, setSelectedVoice] = useState<number>(0);

  const [isUttering, setIsUttering] = useState<number | null>(null);
  return (
    <div>
      <div>
        {availableVoices.map((av, i) => {
          return (
            <div key={i}>
              <input
                type="radio"
                checked={selectedVoice === i}
                onChange={() => {
                  setSelectedVoice(i);
                }}
              />{" "}
              {av.name};{av.lang}
            </div>
          );
        })}
      </div>

      {article.data.map((d, i) => {
        const Component = renderables[d.type];

        const classes = clsx({
          [isUtteringClass]: isUttering === i
        });

        return (
          <div key={i} className={classes}>
            <Component data={d} />
          </div>
        );
      })}

      <button
        onClick={async () => {
          console.log(voices, "voices");

          const theVoice = availableVoices[selectedVoice];

          if (!theVoice) {
            return;
          }

          console.log("SPEAKING WITH A VOICE", theVoice);

          for (const [i, d] of article.data.entries()) {
            setIsUttering(i);
            const promise = new Promise((resolve) => {
              const utterance = new SpeechSynthesisUtterance(d.text);

              utterance.addEventListener("end", () => {
                resolve(true);
              });

              utterance.voice = theVoice;
              synth.speak(utterance);
            });

            await promise;
          }

          setIsUttering(null);
        }}
      >
        <FaMusic />
        &nbsp;puhu
      </button>
    </div>
  );
};

export default Renderer;
