import clsx from "clsx";
import { FC, useMemo, useState } from "react";
import { contentClass, imgClass, isUtteringClass } from "./App.css";
import { FaMusic } from "react-icons/fa";
import Renderer, { Article } from "./Renderer";
import YleForDucks from "./YleForDucks";

const articles: Article[] = [
  {
    locale: "fi",
    data: [
      {
        type: "heading",
        text: "Sähkön hinnannousu saa Mika Kurun vain hymyilemään – pihan pieni vesivoimala tuottaa hänelle jopa tuhansia euroja kuukaudessa"
      },

      {
        type: "paragraph",
        text: "Simpeleläinen Mika Kuru on ollut sähkön suhteen omavarainen jo pitkään. Vesivoimala on aikoinaan tuottanut sähköä esimerkiksi myllylle, mutta nyt lähinnä kahdelle omakotitalolle.."
      },
      {
        type: "image",
        src: "https://images.cdn.yle.fi/image/upload/c_crop,x_0,y_0,w_3488,h_1967/w_1920,h_1080,ar_1.7783426,dpr_1,c_fill/q_auto:eco,f_auto,fl_lossy/39-99273962f4aa9385b4b",
        text: "Mika Kurun vesivoimala tuottaa vuodessa keskimäärin 190 000 kWh sähköä. Kuva: Ville Toijonen / Yle"
      },
      {
        type: "paragraph",
        text: " Mika Kuru seisoo Torsajoen ja oman vesivoimalansa vieressä Rautjärven Simpeleellä. Uutiset sähkönhinnan rajusta noususta kiinnostavat miestä."
      },

      {
        type: "paragraph",
        text: "–Toki se vähän hymyilyttää, ainakin minun kannaltani. Jos joutuu ostamaan sähköä, niin varmaan tilanne on täysin päinvastainen."
      },

      {
        type: "paragraph",
        text: "Kurulla on siis käynyt hyvä tuuri. Hänen maillaan sattuu olemaan noin 70–80 vuotta sähköä tuottanut vesivoimala. Sen voimin on pyöritetty aikoinaan niin myllyä kuin sahaa."
      }
    ]
  },
  {
    locale: "en",
    data: [
      {
        type: "heading",
        text: "Sanna Marin prepared to take drug test following party video criticism"
      },

      {
        type: "paragraph",
        text: "The Prime Minister answered media questions on Thursday after videos of her partying with Finnish celebrities spread on social media."
      }
    ]
  },
  {
    locale: "sv",
    data: [
      {
        type: "heading",
        text: "Vilken är din favoritart i naturen? Skicka in din berättelse och en bild"
      },

      {
        type: "paragraph",
        text: "Kom med och fira Den finska naturens dag och berätta vilken din favoritart i naturen är. Varje berättelse visar på mångfalden i vår natur och det värde som inte kan mätas i pengar."
      }
    ]
  }
];

const App: FC = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const synth = useMemo(() => {
    const synth = window.speechSynthesis;

    if (!synth) {
      return undefined;
    }

    const voices = synth.getVoices();
    setVoices(voices);

    synth?.addEventListener?.("voiceschanged", (e) => {
      const voices = synth.getVoices();

      console.log("voices", voices);
      setVoices(voices);
    });

    return synth;
  }, []);

  return (
    <main className={contentClass}>
      <div
        style={{
          height: "100px"
        }}
      >
        <h1>
          <div>
            <YleForDucks height="50" /> YLE for ducks
          </div>
        </h1>
      </div>
      {articles.map((article, i) => {
        return (
          <Renderer key={i} synth={synth} voices={voices} article={article} />
        );
      })}
    </main>
  );
};

export default App;
