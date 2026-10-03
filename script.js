/* =========================================================
   ATOM BUILDER
   2D ATOM ENGINE
   No libraries
========================================================= */


/* =========================================================
   ELEMENT DATABASE
========================================================= */

const elements = [
  ["H","Hydrogen"],
  ["He","Helium"],
  ["Li","Lithium"],
  ["Be","Beryllium"],
  ["B","Boron"],
  ["C","Carbon"],
  ["N","Nitrogen"],
  ["O","Oxygen"],
  ["F","Fluorine"],
  ["Ne","Neon"],
  ["Na","Sodium"],
  ["Mg","Magnesium"],
  ["Al","Aluminium"],
  ["Si","Silicon"],
  ["P","Phosphorus"],
  ["S","Sulfur"],
  ["Cl","Chlorine"],
  ["Ar","Argon"],
  ["K","Potassium"],
  ["Ca","Calcium"],
  ["Sc","Scandium"],
  ["Ti","Titanium"],
  ["V","Vanadium"],
  ["Cr","Chromium"],
  ["Mn","Manganese"],
  ["Fe","Iron"],
  ["Co","Cobalt"],
  ["Ni","Nickel"],
  ["Cu","Copper"],
  ["Zn","Zinc"],
  ["Ga","Gallium"],
  ["Ge","Germanium"],
  ["As","Arsenic"],
  ["Se","Selenium"],
  ["Br","Bromine"],
  ["Kr","Krypton"],
  ["Rb","Rubidium"],
  ["Sr","Strontium"],
  ["Y","Yttrium"],
  ["Zr","Zirconium"],
  ["Nb","Niobium"],
  ["Mo","Molybdenum"],
  ["Tc","Technetium"],
  ["Ru","Ruthenium"],
  ["Rh","Rhodium"],
  ["Pd","Palladium"],
  ["Ag","Silver"],
  ["Cd","Cadmium"],
  ["In","Indium"],
  ["Sn","Tin"],
  ["Sb","Antimony"],
  ["Te","Tellurium"],
  ["I","Iodine"],
  ["Xe","Xenon"],
  ["Cs","Cesium"],
  ["Ba","Barium"],
  ["La","Lanthanum"],
  ["Ce","Cerium"],
  ["Pr","Praseodymium"],
  ["Nd","Neodymium"],
  ["Pm","Promethium"],
  ["Sm","Samarium"],
  ["Eu","Europium"],
  ["Gd","Gadolinium"],
  ["Tb","Terbium"],
  ["Dy","Dysprosium"],
  ["Ho","Holmium"],
  ["Er","Erbium"],
  ["Tm","Thulium"],
  ["Yb","Ytterbium"],
  ["Lu","Lutetium"],
  ["Hf","Hafnium"],
  ["Ta","Tantalum"],
  ["W","Tungsten"],
  ["Re","Rhenium"],
  ["Os","Osmium"],
  ["Ir","Iridium"],
  ["Pt","Platinum"],
  ["Au","Gold"],
  ["Hg","Mercury"],
  ["Tl","Thallium"],
  ["Pb","Lead"],
  ["Bi","Bismuth"],
  ["Po","Polonium"],
  ["At","Astatine"],
  ["Rn","Radon"],
  ["Fr","Francium"],
  ["Ra","Radium"],
  ["Ac","Actinium"],
  ["Th","Thorium"],
  ["Pa","Protactinium"],
  ["U","Uranium"],
  ["Np","Neptunium"],
  ["Pu","Plutonium"],
  ["Am","Americium"],
  ["Cm","Curium"],
  ["Bk","Berkelium"],
  ["Cf","Californium"],
  ["Es","Einsteinium"],
  ["Fm","Fermium"],
  ["Md","Mendelevium"],
  ["No","Nobelium"],
  ["Lr","Lawrencium"],
  ["Rf","Rutherfordium"],
  ["Db","Dubnium"],
  ["Sg","Seaborgium"],
  ["Bh","Bohrium"],
  ["Hs","Hassium"],
  ["Mt","Meitnerium"],
  ["Ds","Darmstadtium"],
  ["Rg","Roentgenium"],
  ["Cn","Copernicium"],
  ["Nh","Nihonium"],
  ["Fl","Flerovium"],
  ["Mc","Moscovium"],
  ["Lv","Livermorium"],
  ["Ts","Tennessine"],
  ["Og","Oganesson"]
];


/* =========================================================
   STATE
========================================================= */

let protons = 0;
let neutrons = 0;
let electrons = 0;


/* =========================================================
   CANVAS
========================================================= */

const canvas =
  document.getElementById("atomCanvas");

const ctx =
  canvas.getContext("2d");

let width = 0;
let height = 0;

let centerX = 0;
let centerY = 0;

let scale = 1;

let time = 0;

let rotation = 0;
let targetRotation = 0;

let dragging = false;
let lastX = 0;


/* =========================================================
   SHELL SYSTEM
========================================================= */

const shellCapacity = [
  2,
  8,
  18,
  32,
  32,
  18,
  8
];

const shellNames = [
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q"
];


/* =========================================================
   PERIODIC INFORMATION
========================================================= */

const radioactiveElements =
  new Set([
    43, 61,
    84, 85, 86,
    87, 88,
    89, 90, 91, 92, 93, 94,
    95, 96, 97, 98, 99, 100,
    101, 102, 103, 104, 105, 106,
    107, 108, 109, 110, 111, 112,
    113, 114, 115, 116, 117, 118
  ]);


/*
  Elements for which the element itself has
  no stable isotope.

  Some individual isotopes of other elements
  can also be radioactive.
*/

const noStableIsotope =
  new Set([
    43,
    61,
    84,
    85,
    86,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    109,
    110,
    111,
    112,
    113,
    114,
    115,
    116,
    117,
    118
  ]);


/* =========================================================
   RESIZE
========================================================= */

function resizeCanvas() {

  const rect =
    canvas.getBoundingClientRect();

  const dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );

  width = rect.width;
  height = rect.height;

  canvas.width =
    width * dpr;

  canvas.height =
    height * dpr;

  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );

  centerX =
    width / 2;

  centerY =
    height / 2;

  scale =
    Math.min(width, height) / 430;
}

window.addEventListener(
  "resize",
  resizeCanvas
);


/* =========================================================
   ELECTRON DISTRIBUTION
========================================================= */

function getShells() {

  let remaining =
    electrons;

  const shells = [];

  for (
    let i = 0;
    i < shellCapacity.length;
    i++
  ) {

    const amount =
      Math.min(
        remaining,
        shellCapacity[i]
      );

    shells.push(amount);

    remaining -= amount;

    if (remaining <= 0) {
      break;
    }
  }

  return shells;
}


/* =========================================================
   NUCLEAR STABILITY
========================================================= */

function getNuclearStatus() {

  if (protons === 0) {

    return {
      label: "No nucleus",
      detail: "Add protons to create an element."
    };
  }


  const mass =
    protons + neutrons;


  /*
    A completely empty neutron count isn't
    automatically declared radioactive.
  */

  if (mass === 0) {

    return {
      label: "Incomplete nucleus",
      detail: "The atom needs a valid nucleus."
    };
  }


  /*
    If this element has no stable isotopes,
    classify it as radioactive.
  */

  if (
    noStableIsotope.has(protons)
  ) {

    return {
      label: "Radioactive element",
      detail:
        "No stable isotope is known for this element."
    };
  }


  /*
    For lighter elements, an extreme neutron/
    proton imbalance is flagged as an unstable
    isotope rather than pretending every isotope
    is stable.
  */

  const ratio =
    neutrons / protons;


  if (
    protons <= 20 &&
    (
      ratio < 0.65 ||
      ratio > 1.65
    )
  ) {

    return {
      label: "Likely unstable isotope",
      detail:
        "This neutron-to-proton ratio is far from the stable region."
    };
  }


  if (
    protons > 20 &&
    ratio > 1.8
  ) {

    return {
      label: "Likely unstable isotope",
      detail:
        "The nucleus has an unusually high neutron-to-proton ratio."
    };
  }


  if (
    radioactiveElements.has(protons)
  ) {

    return {
      label: "Radioactive",
      detail:
        "This element is associated with radioactive nuclei."
    };
  }


  return {
    label: "Potentially stable isotope",
    detail:
      "The selected neutron count is within a plausible stable region."
  };
}


/* =========================================================
   CHEMICAL CLASSIFICATION
========================================================= */

function getClassification() {

  if (protons === 0) {

    return {
      label: "No element",
      detail: "Build a nucleus first."
    };
  }


  const periodGroups = {

    1: [1, 2],

    2: [
      3,4,5,6,7,8,9,10
    ],

    3: [
      11,12,13,14,15,16,17,18
    ],

    4: [
      19,20,21,22,23,24,25,
      26,27,28,29,30,31,32,33,
      34,35,36
    ],

    5: [
      37,38,39,40,41,42,43,44,
      45,46,47,48,49,50,51,52,
      53,54
    ],

    6: [
      55,56,57,58,59,60,61,62,
      63,64,65,66,67,68,69,70,
      71,72,73,74,75,76,77,78,
      79,80,81,82,83,84,85,86
    ],

    7: [
      87,88,89,90,91,92,93,94,
      95,96,97,98,99,100,101,102,
      103,104,105,106,107,108,
      109,110,111,112,113,114,
      115,116,117,118
    ]
  };


  /* Noble gases */

  if (
    [2,10,18,36,54,86,118]
      .includes(protons)
  ) {

    return {
      label: "Noble gas • Inert",
      detail:
        "Its outer electron shell is complete, giving it very low chemical reactivity."
    };
  }


  /* Alkali metals */

  if (
    [3,11,19,37,55,87]
      .includes(protons)
  ) {

    return {
      label: "Alkali metal • Highly reactive",
      detail:
        "One outer electron makes these metals strongly reactive."
    };
  }


  /* Alkaline earth */

  if (
    [4,12,20,38,56,88]
      .includes(protons)
  ) {

    return {
      label: "Alkaline-earth metal",
      detail:
        "These metals commonly form +2 ions."
    };
  }


  /* Halogens */

  if (
    [9,17,35,53,85,117]
      .includes(protons)
  ) {

    return {
      label: "Halogen • Reactive nonmetal",
      detail:
        "Seven valence electrons makes these elements strongly reactive."
    };
  }


  /* Hydrogen */

  if (protons === 1) {

    return {
      label: "Reactive nonmetal",
      detail:
        "Hydrogen has one electron in its first shell."
    };
  }


  /* Lanthanides */

  if (
    protons >= 57 &&
    protons <= 71
  ) {

    return {
      label: "Lanthanide",
      detail:
        "Inner transition metal from the lanthanide series."
    };
  }


  /* Actinides */

  if (
    protons >= 89 &&
    protons <= 103
  ) {

    return {
      label: "Actinide",
      detail:
        "Inner transition metal from the actinide series."
    };
  }


  /* Transition metals */

  if (
    (
      protons >= 21 &&
      protons <= 30
    ) ||
    (
      protons >= 39 &&
      protons <= 48
    ) ||
    (
      protons >= 72 &&
      protons <= 80
    ) ||
    (
      protons >= 104 &&
      protons <= 112
    )
  ) {

    return {
      label: "Transition metal",
      detail:
        "Metal with partially filled d-subshell chemistry."
    };
  }


  /* Metalloids */

  if (
    [
      5,13,14,32,33,51,52
    ].includes(protons)
  ) {

    return {
      label: "Metalloid",
      detail:
        "Shows a mixture of metallic and nonmetallic properties."
    };
  }


  /* Post-transition metals */

  if (
    [
      13,31,49,50,
      81,82,83,
      113,114
    ].includes(protons)
  ) {

    return {
      label: "Post-transition metal",
      detail:
        "Metallic element from the p-block."
    };
  }


  /* Nonmetals */

  if (
    [
      6,7,8,
      15,16,
      34
    ].includes(protons)
  ) {

    return {
      label: "Reactive nonmetal",
      detail:
        "This element generally participates readily in chemical bonding."
    };
  }


  return {
    label: "Metal / p-block element",
    detail:
      "Chemical behavior depends on electron configuration and bonding."
  };
}


/* =========================================================
   VALENCE ELECTRONS
========================================================= */

function getValenceElectrons() {

  const shells =
    getShells();

  if (!shells.length) {
    return 0;
  }

  return shells[shells.length - 1];
}


/* =========================================================
   BONDING BEHAVIOR
========================================================= */

function getBondingBehavior() {

  if (protons === 0) {
    return "—";
  }


  const charge =
    protons - electrons;


  if (
    [2,10,18,36,54,86,118]
      .includes(protons)
    &&
    charge === 0
  ) {

    return "Very low reactivity";
  }


  if (charge > 0) {

    return "Cation";
  }


  if (charge < 0) {

    return "Anion";
  }


  const valence =
    getValenceElectrons();


  if (valence === 1) {
    return "Often loses 1 electron";
  }

  if (valence === 2) {
    return "Often loses or shares electrons";
  }

  if (valence === 7) {
    return "Often gains or shares 1 electron";
  }

  if (valence === 8) {
    return "Very low reactivity";
  }

  return "Usually forms covalent/metallic bonds";
}


/* =========================================================
   BACKGROUND
========================================================= */

function drawBackground() {

  const gradient =
    ctx.createRadialGradient(
      centerX,
      centerY,
      20 * scale,
      centerX,
      centerY,
      Math.max(width,height) * .7
    );

  gradient.addColorStop(
    0,
    "#132944"
  );

  gradient.addColorStop(
    .55,
    "#081422"
  );

  gradient.addColorStop(
    1,
    "#03070d"
  );

  ctx.fillStyle =
    gradient;

  ctx.fillRect(
    0,
    0,
    width,
    height
  );


  /* subtle stars */

  ctx.save();

  ctx.globalAlpha = .15;

  for (
    let i = 0;
    i < 90;
    i++
  ) {

    const x =
      (i * 137 + 31) % width;

    const y =
      (i * 71 + 19) % height;

    ctx.fillStyle =
      "#9cc9ee";

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      1,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  ctx.restore();
}


/* =========================================================
   ORBITS
========================================================= */

function drawOrbits() {

  const shells =
    getShells();


  /*
    IMPORTANT:
    Every shell gets its own radius.
    The spacing is deliberately large so
    shells cannot visually merge.
  */

  const firstRadius =
    55 * scale;

  const shellGap =
    46 * scale;


  shells.forEach(
    (count, shellIndex) => {

      if (count <= 0) return;


      const radius =
        firstRadius +
        shellIndex * shellGap;


      ctx.save();

      ctx.translate(
        centerX,
        centerY
      );

      /*
        Each orbit gets a slightly different
        orientation to create depth without
        using fake 3D.
      */

      ctx.rotate(
        Math.sin(
          shellIndex * 1.7
        ) * .12
        +
        rotation *
        (
          shellIndex % 2 === 0
            ? .15
            : -.15
        )
      );


      ctx.beginPath();

      ctx.ellipse(
        0,
        0,
        radius,
        radius * .68,
        0,
        0,
        Math.PI * 2
      );


      ctx.strokeStyle =
        "rgba(92,161,218,.34)";

      ctx.lineWidth =
        Math.max(
          1,
          1.2 * scale
        );

      ctx.stroke();


      /*
        Small shell marker
      */

      ctx.fillStyle =
        "rgba(120,180,225,.55)";

      ctx.font =
        `${9 * Math.max(scale,.8)}px system-ui`;

      ctx.textAlign =
        "center";

      ctx.fillText(
        shellNames[shellIndex],
        0,
        -radius * .69 - 7
      );


      ctx.restore();
    }
  );
}


/* =========================================================
   NUCLEUS GLOW
========================================================= */

function drawNucleusGlow() {

  const total =
    protons + neutrons;

  if (total <= 0) return;


  const radius =
    Math.min(
      68,
      27 + Math.sqrt(total) * 4
    ) * scale;


  const glow =
    ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      radius * 2.4
    );

  glow.addColorStop(
    0,
    "rgba(255,65,90,.30)"
  );

  glow.addColorStop(
    .45,
    "rgba(255,65,90,.10)"
  );

  glow.addColorStop(
    1,
    "rgba(255,65,90,0)"
  );

  ctx.fillStyle =
    glow;

  ctx.beginPath();

  ctx.arc(
    centerX,
    centerY,
    radius * 2.4,
    0,
    Math.PI * 2
  );

  ctx.fill();
}


/* =========================================================
   NUCLEUS
========================================================= */

function drawNucleus() {

  const total =
    protons + neutrons;


  if (total <= 0) {

    ctx.fillStyle =
      "#698198";

    ctx.font =
      `${13 * Math.max(scale,.8)}px system-ui`;

    ctx.textAlign =
      "center";

    ctx.fillText(
      "ADD PARTICLES",
      centerX,
      centerY + 12
    );

    return;
  }


  /*
    Limit rendered particles for performance.
    The counters remain exact.
  */

  const visible =
    Math.min(
      total,
      80
    );


  const protonVisible =
    Math.round(
      visible *
      protons /
      total
    );


  const radius =
    Math.min(
      68,
      27 + Math.sqrt(total) * 4
    ) * scale;


  for (
    let i = 0;
    i < visible;
    i++
  ) {

    const angle =
      i *
      Math.PI *
      (3 - Math.sqrt(5));


    const distance =
      Math.sqrt(
        (i + .5) / visible
      );


    const x =
      centerX +
      Math.cos(angle) *
      distance *
      radius *
      .83;


    const y =
      centerY +
      Math.sin(angle) *
      distance *
      radius *
      .83;


    const r =
      Math.max(
        4,
        8 * scale
      );


    const proton =
      i < protonVisible;


    const gradient =
      ctx.createRadialGradient(
        x - r*.3,
        y - r*.35,
        1,
        x,
        y,
        r
      );


    if (proton) {

      gradient.addColorStop(
        0,
        "#ffd0d5"
      );

      gradient.addColorStop(
        .45,
        "#ff6979"
      );

      gradient.addColorStop(
        1,
        "#9c273a"
      );

    } else {

      gradient.addColorStop(
        0,
        "#ffffff"
      );

      gradient.addColorStop(
        .5,
        "#d1d9e3"
      );

      gradient.addColorStop(
        1,
        "#6c7888"
      );
    }


    ctx.fillStyle =
      gradient;

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      r,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }
}


/* =========================================================
   ELECTRONS
========================================================= */

function drawElectrons() {

  const shells =
    getShells();


  const firstRadius =
    55 * scale;

  const shellGap =
    46 * scale;


  shells.forEach(
    (count, shellIndex) => {

      if (count <= 0) return;


      const radius =
        firstRadius +
        shellIndex * shellGap;


      /*
        This is the important part:
        electron position uses EXACTLY the
        same radius as its shell.
      */

      for (
        let i = 0;
        i < count;
        i++
      ) {

        const orbitSpeed =
          .34 +
          shellIndex * .045;


        const direction =
          shellIndex % 2 === 0
            ? 1
            : -1;


        const angle =
          (
            time *
            orbitSpeed *
            direction
          )
          +
          rotation
          +
          (
            i / count *
            Math.PI * 2
          );


        const x =
          centerX +
          Math.cos(angle) *
          radius;


        const y =
          centerY +
          Math.sin(angle) *
          radius *
          .68;


        /*
          Electron glow
        */

        const glow =
          ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            15 * scale
          );

        glow.addColorStop(
          0,
          "rgba(70,175,255,.65)"
        );

        glow.addColorStop(
          .4,
          "rgba(70,175,255,.18)"
        );

        glow.addColorStop(
          1,
          "rgba(70,175,255,0)"
        );

        ctx.fillStyle =
          glow;

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          15 * scale,
          0,
          Math.PI * 2
        );

        ctx.fill();


        /*
          Electron itself
        */

        ctx.fillStyle =
          "#57b5ff";

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          Math.max(
            3.5,
            4.5 * scale
          ),
          0,
          Math.PI * 2
        );

        ctx.fill();


        ctx.strokeStyle =
          "#e4f7ff";

        ctx.lineWidth =
          1;

        ctx.stroke();
      }
    }
  );
}


/* =========================================================
   DRAW
========================================================= */

function draw() {

  drawBackground();

  drawOrbits();

  drawNucleusGlow();

  drawNucleus();

  drawElectrons();
}


/* =========================================================
   ANIMATION
========================================================= */

function animate() {

  time += .025;


  if (!dragging) {

    targetRotation += .0008;
  }


  rotation +=
    (
      targetRotation -
      rotation
    ) * .08;


  draw();

  requestAnimationFrame(
    animate
  );
}


/* =========================================================
   DRAG ROTATION
========================================================= */

canvas.addEventListener(
  "pointerdown",
  event => {

    dragging = true;

    lastX =
      event.clientX;

    canvas.setPointerCapture(
      event.pointerId
    );
  }
);


canvas.addEventListener(
  "pointermove",
  event => {

    if (!dragging) return;


    const dx =
      event.clientX -
      lastX;


    targetRotation +=
      dx * .012;


    lastX =
      event.clientX;
  }
);


function stopDrag() {
  dragging = false;
}


canvas.addEventListener(
  "pointerup",
  stopDrag
);

canvas.addEventListener(
  "pointercancel",
  stopDrag
);


/* =========================================================
   PARTICLE CHANGES
========================================================= */

function changeParticle(
  type,
  amount
) {

  if (type === "p") {

    protons += amount;

    protons =
      Math.max(
        0,
        Math.min(
          118,
          protons
        )
      );


    /*
      A real atom cannot have more electrons
      than our game model supports.
      We don't automatically change them:
      electrons are controlled independently
      so ions can be built.
    */
  }


  if (type === "n") {

    neutrons += amount;

    /*
      200 is a gameplay boundary,
      not a claim that every element can
      physically have 200 neutrons.
    */

    neutrons =
      Math.max(
        0,
        Math.min(
          200,
          neutrons
        )
      );
  }


  if (type === "e") {

    electrons += amount;

    /*
      Allow enough electrons to make
      ordinary ions while preventing
      ridiculous counts.
    */

    electrons =
      Math.max(
        0,
        Math.min(
          118,
          electrons
        )
      );
  }


  updateUI();
}


/* =========================================================
   UI
========================================================= */

function updateUI() {

  document.getElementById(
    "pCount"
  ).textContent =
    protons;


  document.getElementById(
    "nCount"
  ).textContent =
    neutrons;


  document.getElementById(
    "eCount"
  ).textContent =
    electrons;


  document.getElementById(
    "pControl"
  ).textContent =
    protons;


  document.getElementById(
    "nControl"
  ).textContent =
    neutrons;


  document.getElementById(
    "eControl"
  ).textContent =
    electrons;


  const charge =
    protons - electrons;


  const chargeText =
    charge > 0
      ? "+" + charge
      : String(charge);


  document.getElementById(
    "chargeDisplay"
  ).textContent =
    chargeText;


  /*
    No element yet
  */

  if (protons === 0) {

    document.getElementById(
      "elementName"
    ).textContent =
      "No element";


    document.getElementById(
      "elementSymbol"
    ).textContent =
      "—";


    document.getElementById(
      "massNumber"
    ).textContent =
      "Mass number: —";


    document.getElementById(
      "isotopeName"
    ).textContent =
      "—";


    document.getElementById(
      "ionType"
    ).textContent =
      "Neutral atom";


    document.getElementById(
      "ionDetail"
    ).textContent =
      "Charge: 0";


    document.getElementById(
      "shellDisplay"
    ).textContent =
      electrons
        ? getShells().join(" · ")
        : "—";


    document.getElementById(
      "valenceDisplay"
    ).textContent =
      electrons
        ? getValenceElectrons()
        : "—";


    document.getElementById(
      "valenceDetail"
    ).textContent =
      "No element selected";


    document.getElementById(
      "classification"
    ).textContent =
      "—";


    document.getElementById(
      "classificationDetail"
    ).textContent =
      "Build an atom first.";


    document.getElementById(
      "radioactivity"
    ).textContent =
      "—";


    document.getElementById(
      "radioactivityDetail"
    ).textContent =
      "Build a nucleus first.";


    document.getElementById(
      "atomicNumberInfo"
    ).textContent =
      "—";


    document.getElementById(
      "npRatio"
    ).textContent =
      "—";


    document.getElementById(
      "outerShell"
    ).textContent =
      "—";


    document.getElementById(
      "bondingBehavior"
    ).textContent =
      "—";


    highlightElement(0);

    return;
  }


  const element =
    elements[protons - 1];


  document.getElementById(
    "elementName"
  ).textContent =
    element[1];


  document.getElementById(
    "elementSymbol"
  ).textContent =
    element[0];


  const mass =
    protons + neutrons;


  document.getElementById(
    "massNumber"
  ).textContent =
    "Mass number: " + mass;


  document.getElementById(
    "isotopeName"
  ).textContent =
    `${element[0]}-${mass}`;


  /*
    Ion
  */

  let ionLabel;


  if (charge === 0) {

    ionLabel =
      "Neutral atom";

  } else if (charge > 0) {

    ionLabel =
      "Positive ion";

  } else {

    ionLabel =
      "Negative ion";
  }


  document.getElementById(
    "ionType"
  ).textContent =
    ionLabel;


  document.getElementById(
    "ionDetail"
  ).textContent =
    "Charge: " + chargeText;


  /*
    Shells
  */

  const shells =
    getShells();


  document.getElementById(
    "shellDisplay"
  ).textContent =
    shells.join(" · ");


  /*
    Valence
  */

  const valence =
    getValenceElectrons();


  document.getElementById(
    "valenceDisplay"
  ).textContent =
    valence;


  document.getElementById(
    "valenceDetail"
  ).textContent =
    `${shellNames[shells.length - 1]} shell • outermost occupied shell`;


  /*
    Classification
  */

  const classification =
    getClassification();


  document.getElementById(
    "classification"
  ).textContent =
    classification.label;


  document.getElementById(
    "classificationDetail"
  ).textContent =
    classification.detail;


  /*
    Nuclear stability
  */

  const nuclear =
    getNuclearStatus();


  document.getElementById(
    "radioactivity"
  ).textContent =
    nuclear.label;


  document.getElementById(
    "radioactivityDetail"
  ).textContent =
    nuclear.detail;


  /*
    Logic
  */

  document.getElementById(
    "atomicNumberInfo"
  ).textContent =
    protons;


  document.getElementById(
    "npRatio"
  ).textContent =
    (
      neutrons / protons
    ).toFixed(2);


  document.getElementById(
    "outerShell"
  ).textContent =
    shellNames[
      shells.length - 1
    ] || "—";


  document.getElementById(
    "bondingBehavior"
  ).textContent =
    getBondingBehavior();


  /*
    Highlight current element
  */

  highlightElement(
    protons
  );
}


/* =========================================================
   PERIODIC TABLE
========================================================= */

function createPeriodicTable() {

  const table =
    document.getElementById(
      "periodicTable"
    );


  table.innerHTML = "";


  elements.forEach(
    (element, index) => {

      const cell =
        document.createElement(
          "div"
        );


      cell.className =
        "element";


      cell.dataset.atomicNumber =
        index + 1;


      cell.innerHTML = `
        <span class="element-number">
          ${index + 1}
        </span>

        <span class="element-symbol">
          ${element[0]}
        </span>
      `;


      /*
        Clicking the periodic table does NOT
        alter the atom.
      */

      cell.addEventListener(
        "click",
        () => {

          highlightElement(
            index + 1
          );
        }
      );


      table.appendChild(
        cell
      );
    }
  );
}


/* =========================================================
   HIGHLIGHT
========================================================= */

function highlightElement(number) {

  document
    .querySelectorAll(
      ".element"
    )
    .forEach(
      cell => {

        cell.classList.toggle(
          "active",
          Number(
            cell.dataset.atomicNumber
          ) === number
        );
      }
    );
}


/* =========================================================
   START GAME
========================================================= */

createPeriodicTable();

resizeCanvas();

updateUI();

animate();
