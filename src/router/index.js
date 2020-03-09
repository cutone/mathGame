import Vue from "vue";
import Router from "vue-router";
import MaxFive from "@/components/maxFive/maxFive";
import Home from "@/components/home";
import bottomClassMenu from "@/components/bottomClassMenu";
import middleClassMenu from "@/components/middleClassMenu";
import topClassMenu from "@/components/topClassMenu";
import trapezoid from "@/components/trapezoid/trapezoid";
//小班
import compareSize from "@/components/compareSize/compareSize";
import oneAndMany from "@/components/oneAndMany/oneAndMany";
import compareNumber from "@/components/compareNumber/compareNumber";
import beforeAndAfter from "@/components/beforeAndAfter/beforeAndAfter";
import topAndBottom from "@/components/topAndBottom/topAndBottom";
import circle from "@/components/circle/circle";
import classificationByName from "@/components/classificationByName/classificationByName";
import numberWithinThree from "@/components/numberWithinThree/numberWithinThree";
import square from "@/components/square/square";
import triangle from "@/components/triangle/triangle";
import numberWithinFive from "@/components/numberWithinFive/numberWithinFive";

//中班
import sequenceFive from "@/components/sequenceFive/sequenceFive";
import sequenceTen from "@/components/sequenceTen/sequenceTen";
import regular from "@/components/regular/regular";
import ringCounting from "@/components/ringCounting/ringCounting";
import splitFive from "@/components/splitFive/splitFive";
import rectangle from "@/components/rectangle/rectangle";
import oval from "@/components/oval/oval";
import compareNeighborsFive from "@/components/compareNeighborsFive/compareNeighborsFive";
import sixToTen from "@/components/sixToTen/sixToTen";
import splitAndCombination from "@/components/splitAndCombination/splitAndCombination";
import compareNumberWithinFive from "@/components/compareNumberWithinFive/compareNumberWithinFive";
import regular2 from "@/components/regular2/regular2";
import numbersWithinSeven from "@/components/numbersWithinSeven/numbersWithinSeven";
import sequenceFive2 from "@/components/sequenceFive2/sequenceFive2";
import compareSixToTen from '@/components/compareSixToTen/compareSixToTen'

//大班
import cylinder from "@/components/cylinder/cylinder";
import oddEvenNumber from "@/components/oddEvenNumber/oddEvenNumber";
import levelClassify from "@/components/levelClassify/levelClassify";
import adjoinNumber from "@/components/adjoinNumber/adjoinNumber";
import twoDimensionClassify from "@/components/twoDimensionClassify/twoDimensionClassify";
import regular4 from "@/components/regular/regular4";
import numberInLife from "@/components/numberInLife/numberInLife";
import numberWithinTen from "@/components/numberWithinTen/numberWithinTen";
import leftAndRight from "@/components/leftAndRight/leftAndRight";
import selfMadeQuestion from "@/components/selfMadeQuestion/selfMadeQuestion";
import learnZero from "@/components/learnZero/learnZero";
import addAndSubWithinTen from "@/components/addAndSubWithinTen/addAndSubWithinTen";
import selfSubQuestionWithinTen from "@/components/selfSubQuestionWithinTen/selfSubQuestionWithinTen";
import multiAngleClassification from "@/components/multiAngleClassification/multiAngleClassification";
import nineAndTen from "@/components/nineAndTen/nineAndTen";
import cube from "@/components/cube/cube";
import bisect from "@/components/bisect/bisect";
import lengthAndArea from "@/components/lengthAndArea/lengthAndArea";
import learnAdd from "@/components/learnAdd/learnAdd";
import learnSub from "@/components/learnSub/learnSub";
import sixToEight from "@/components/sixToEight/sixToEight";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/bottomClassMenu",
      name: "bottomClassMenu",
      component: bottomClassMenu,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/middleClassMenu",
      name: "middleClassMenu",
      component: middleClassMenu,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/topClassMenu",
      name: "topClassMenu",
      component: topClassMenu,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/triangle",
      name: "triangle",
      component: triangle,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/square",
      name: "square",
      component: square,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/numberWithinThree",
      name: "numberWithinThree",
      component: numberWithinThree,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/numberWithinFive",
      name: "numberWithinFive",
      component: numberWithinFive,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/classificationByName",
      name: "classificationByName",
      component: classificationByName,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/circle",
      name: "circle",
      component: circle,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/maxFive",
      name: "MaxFive",
      component: MaxFive
    },
    {
      path: "/trapezoid",
      name: "trapezoid",
      component: trapezoid,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/sequenceFive",
      name: "sequenceFive",
      component: sequenceFive,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/regular",
      name: "regular",
      component: regular,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/sequenceTen",
      name: "sequenceTen",
      component: sequenceTen,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/ringCounting",
      name: "ringCounting",
      component: ringCounting,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/splitFive",
      name: "splitFive",
      component: splitFive,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/compareSize",
      name: "compareSize",
      component: compareSize,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/cylinder",
      name: "cylinder",
      component: cylinder,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/oddEvenNumber",
      name: "oddEvenNumber",
      component: oddEvenNumber,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/levelClassify",
      name: "levelClassify",
      component: levelClassify,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/adjoinNumber",
      name: "adjoinNumber",
      component: adjoinNumber,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/twoDimensionClassify",
      name: "twoDimensionClassify",
      component: twoDimensionClassify,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/rectangle",
      name: "rectangle",
      component: rectangle,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/oval",
      name: "oval",
      component: oval,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/compareNeighborsFive",
      name: "compareNeighborsFive",
      component: compareNeighborsFive,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/oneAndMany",
      name: "oneAndMany",
      component: oneAndMany,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/sixToTen",
      name: "sixToTen",
      component: sixToTen,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/splitAndCombination",
      name: "splitAndCombination",
      component: splitAndCombination,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/regular4",
      name: "regular4",
      component: regular4,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/numberInLife",
      name: "numberInLife",
      component: numberInLife,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/numberWithinTen",
      name: "numberWithinTen",
      component: numberWithinTen,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/compareNumber",
      name: "compareNumber",
      component: compareNumber,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/compareNumberWithinFive",
      name: "compareNumberWithinFive",
      component: compareNumberWithinFive,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/regular2",
      name: "regular2",
      component: regular2,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/numbersWithinSeven",
      name: "numbersWithinSeven",
      component: numbersWithinSeven,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/beforeAndAfter",
      name: "beforeAndAfter",
      component: beforeAndAfter,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/leftAndRight",
      name: "leftAndRight",
      component: leftAndRight,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/selfMadeQuestion",
      name: "selfMadeQuestion",
      component: selfMadeQuestion,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/learnZero",
      name: "learnZero",
      component: learnZero,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/addAndSubWithinTen",
      name: "addAndSubWithinTen",
      component: addAndSubWithinTen,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/sequenceFive2",
      name: "sequenceFive2",
      component: sequenceFive2,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/selfSubQuestionWithinTen",
      name: "selfSubQuestionWithinTen",
      component: selfSubQuestionWithinTen,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/multiAngleClassification",
      name: "multiAngleClassification",
      component: multiAngleClassification,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/topAndBottom",
      name: "topAndBottom",
      component: topAndBottom,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/nineAndTen",
      name: "nineAndTen",
      component: nineAndTen,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/cube",
      name: "cube",
      component: cube,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/bisect",
      name: "bisect",
      component: bisect,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/lengthAndArea",
      name: "lengthAndArea",
      component: lengthAndArea,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/learnAdd",
      name: "learnAdd",
      component: learnAdd,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/learnSub",
      name: "learnSub",
      component: learnSub,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/sixToEight",
      name: "sixToEight",
      component: sixToEight,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/compareSixToTen",
      name: "compareSixToTen",
      component: compareSixToTen,
      meta: {
        keepAlive: false
      }
    }
  ]
});
