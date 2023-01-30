type Props = {
  language: any;
};

export default function Banner({ language }: Props) {
  return (
    <section className="w-full flex flex-col">
      {language["language"] === "pt" && (
        <h1 className="text-2xl text-center md:text-left md:text-4xl font-theme leading-relaxed text-themeText">
          Escreva <span className="text-themeShadeText bg-themeText">qualquer</span>{" "}
          história, com{" "}
          <span className="text-themeShadeText bg-themeText">quaisquer</span>{" "}
          personagens em{" "}
          <span className="text-themeShadeText bg-themeText">qualquer</span>
          {" "}lugar.
        </h1>
      )}
      {language["language"] !== "pt" && (
        <h1 className="text-2xl text-center md:text-left md:text-4xl font-theme leading-relaxed text-themeText">
          Write <span className="text-themeShadeText bg-themeText">any</span>{" "}
          story, with{" "}
          <span className="text-themeShadeText bg-themeText">any</span>{" "}
          characters,{" "}
          <span className="text-themeShadeText bg-themeText">anywhere</span>.
        </h1>
      )}
      <div className="md:hidden border-b-2 mt-4 mx-auto w-1/2 border-b-themeShadeText"></div>
    </section>
  );
}
