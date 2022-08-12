import { solveSum, solveSumTwo, subArraySums } from "./cct_sum.js"
import { arrayJumper, testCases as AJTestCases } from "./cct_arrayjump.js"
import { mergeIntervals, testCases as MITests } from "./cct_mergeIntervals.js";
import { shortestPathSimple} from "./cct_shortestPath.js";
import {
  compressRle,
  decompressLZ,
  lzCompressTestCases,
  lzDecompressTestCases,
  rleTestCases as RLETestCases
} from "./cct_compressions.js"
// import { generateIp, testCases } from "./cct_generateIps.js";
// import { getValidMathExpressions, testCases } from "./cct_validMathExpressions.js";
import { stockTradeV2, stockTradeV3, stockTradeV4, v2TestCases, v3TestCases, v4TestCases } from "./cct_stocks.js";
import { decodeHamming, encodeTestCases, decodeTestCases} from "./cct_hamming.js";
import { testStuff } from "./cct_helpers.js"
import {getValidMathExpressions} from "./cct_validMathExpressions.js";
import { getMinTriangleSum} from "./cct_MinimumPathTriangle.js";
import { findLargestPrimeFactor} from "./cct_largestPrime.js";
import { findUniquePathOne, findUniquePathTwo, testCasesTwo as UPTTest, testCasesOne as UPTest} from "./cct_uniquePath.js";
import { sanitizeParentheses } from "./cct_parantheses.js";

const fakeNs = {
  tprint : (a) => { console.log(a) }
}

console.log(stockTradeV4([10,[53,3,146,6,152,134,195,77,122,100,12,165,98,161,184,154,21,193,48,77,91,13,62,200,170,161,160,42,183,21,185,124,14,150]]))

/*
143+189+153+76+172+43+187+141+164+136

 */
