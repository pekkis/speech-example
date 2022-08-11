import clsx from "clsx";
import { FC, useMemo, useState } from "react";
import { contentClass, imgClass, isUtteringClass } from "./App.css";
import { FaMusic } from "react-icons/fa";

const data = [
  {
    isUtterable: true,
    type: "header",
    text: "Sähkön hinnannousu saa Mika Kurun vain hymyilemään – pihan pieni vesivoimala tuottaa hänelle jopa tuhansia euroja kuukaudessa"
  },

  {
    isUtterable: true,
    type: "paragraph",
    text: "Simpeleläinen Mika Kuru on ollut sähkön suhteen omavarainen jo pitkään. Vesivoimala on aikoinaan tuottanut sähköä esimerkiksi myllylle, mutta nyt lähinnä kahdelle omakotitalolle.."
  },
  {
    isUtterable: true,
    type: "image",
    src: "https://images.cdn.yle.fi/image/upload/c_crop,x_0,y_0,w_3488,h_1967/w_1920,h_1080,ar_1.7783426,dpr_1,c_fill/q_auto:eco,f_auto,fl_lossy/39-99273962f4aa9385b4b",
    text: "Mika Kurun vesivoimala tuottaa vuodessa keskimäärin 190 000 kWh sähköä. Kuva: Ville Toijonen / Yle"
  },
  {
    isUtterable: true,
    type: "paragraph",
    text: " Mika Kuru seisoo Torsajoen ja oman vesivoimalansa vieressä Rautjärven Simpeleellä. Uutiset sähkönhinnan rajusta noususta kiinnostavat miestä."
  },

  {
    isUtterable: true,
    type: "paragraph",
    text: "–Toki se vähän hymyilyttää, ainakin minun kannaltani. Jos joutuu ostamaan sähköä, niin varmaan tilanne on täysin päinvastainen."
  },

  {
    isUtterable: true,
    type: "paragraph",
    text: "Kurulla on siis käynyt hyvä tuuri. Hänen maillaan sattuu olemaan noin 70–80 vuotta sähköä tuottanut vesivoimala. Sen voimin on pyöritetty aikoinaan niin myllyä kuin sahaa."
  }
];

const renderables = {
  header: (props) => {
    const classes = clsx({
      [isUtteringClass]: props.isUttering
    });

    return <h2 className={classes}>{props.text}</h2>;
  },
  paragraph: (props) => {
    const classes = clsx({
      [isUtteringClass]: props.isUttering
    });

    return <p className={classes}>{props.text}</p>;
  },
  image: (props) => {
    const classes = clsx({
      [isUtteringClass]: props.isUttering
    });

    return (
      <div className={classes}>
        <img className={imgClass} src={props.src} />
        <div>{props.text}</div>
      </div>
    );
  }
};

const Renderer = (props) => {
  const { data, isUttering } = props;

  return (
    <div>
      {data.map((d, i) => {
        const Component = renderables[d.type];

        if (!Component) {
          return null;
        }

        return <Component isUttering={isUttering === i} key={i} {...d} />;
      })}
    </div>
  );
};

const App: FC = () => {
  const [synth, voices] = useMemo(() => {
    const synth = window.speechSynthesis;

    const voices = synth.getVoices();

    console.log(voices);

    return [synth, voices];
  }, []);

  const [isUttering, setIsUttering] = useState<number | null>(null);

  return (
    <div className={contentClass}>
      <Renderer isUttering={isUttering} data={data} />

      <button
        onClick={async () => {
          const voices = synth.getVoices();

          console.log(voices, "voices");

          const theVoice = voices.find((v) => {
            return v.lang.startsWith("fi");
          });

          if (!theVoice) {
            return;
          }

          for (const [i, d] of data.entries()) {
            setIsUttering(i);
            const promise = new Promise((resolve) => {
              if (!d.isUtterable) {
                return resolve(true);
              }

              const utterance = new SpeechSynthesisUtterance(d.text);

              utterance.addEventListener("end", () => {
                resolve(true);
              });

              utterance.voice = theVoice;
              synth.speak(utterance);
            });

            await promise;
          }
        }}
      >
        <FaMusic />
        &nbsp;puhu
      </button>
    </div>
  );
};

export default App;
