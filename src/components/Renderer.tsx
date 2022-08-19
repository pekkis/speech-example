import clsx from "clsx";
import { FC, useMemo, useState } from "react";
import { FaMusic } from "react-icons/fa";
import {
  imgClass,
  isUtteringClass,
  articleClass,
  selectClass
} from "./Renderer.css";

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
  synth?: SpeechSynthesis;
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

  const classes = clsx(articleClass);

  return (
    <article className={classes} lang={article.locale}>
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

      <div>
        <div>
          <select
            className={selectClass}
            onChange={(e) => {
              setSelectedVoice(parseInt(e.target.value, 10));
            }}
          >
            {availableVoices.map((av, i) => {
              return (
                <option key={i} value={i}>
                  {av.name}; {av.lang}; {av.localService ? "local" : "remote"}
                </option>
              );
            })}
          </select>
        </div>

        <button
          disabled={!synth}
          onClick={async () => {
            if (!synth) {
              return;
            }

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
    </article>
  );
};

export default Renderer;
