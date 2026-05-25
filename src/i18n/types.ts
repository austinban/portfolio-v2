import type { EggId } from "../data/easterEggs";

export type Dir = "ltr" | "rtl";

export interface Translations {
  locale: string;
  dir: Dir;

  ui: {
    nameScreen: {
      before: string;
      disclaimer: string;
      headingLine1: string;
      headingLine2: string;
      placeholder: string;
      skip: string;
      submit: string;
      /** Use {n} as placeholder for the number */
      charsOver: string;
      /** Use {n} as placeholder for the number */
      charsLeft: string;
      tooLong: string[];
      random: {
        label: string;
        weCalled: string;
        accept: string;
        reroll: string;
        goBack: string;
      };
    };
    editName: {
      label: string;
      hint: string;
      eggHint: string;
      /** Use {max} as placeholder for the max length number */
      tooLong: string;
    };
    nav: {
      back: string;
      next: string;
    };
    hint: {
      desktop: string;
      mobile: string;
    };
    langSwitcher: {
      label: string;
    };
  };

  scenes: {
    greeting: {
      subtitleRandom: string;
      subtitleAustin: string;
      subtitleDefault: string;
      /** Use {name} as placeholder for the EditableName component */
      heading: string;
      /** Use {austin} as placeholder for the Austin name span */
      iAm: string;
      /** Use {austin} as placeholder for the Austin name span */
      iAmToo: string;
      body: string;
    };
    about: {
      labelRandom: string;
      labelDefault: string;
      heading: string;
      headingAccent: string;
      p1: string;
      p2: string;
      p3: string;
    };
    whatIDo: {
      labelRandom: string;
      labelDefault: string;
      disciplines: Array<{ label: string; detail: string }>;
      currently: string;
    };
    work: {
      headingRandom: string;
      headingDefault: string;
    };
    contact: {
      /** Use {name} as placeholder for the EditableName component */
      headingRandom: string;
      /** Use {name} as placeholder for the EditableName component */
      headingDefault: string;
      bodyRandom: string;
      bodyDefault: string;
      emailDisplay: string;
    };
  };

  randomNames: string[];

  /**
   * Keyed by easter egg id from easterEggs.ts.
   * TypeScript enforces that ALL 194 egg IDs are present — adding a new egg
   * to easterEggs.ts will immediately error on every incomplete locale file.
   */
  eggs: Record<EggId, string>;
}
