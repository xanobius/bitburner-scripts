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
import {decryptCaesar, decryptVigenere} from "./cct_encryption.js";

const fakeNs = {
  tprint : (a) => { console.log(a) }
}

console.log(decryptCaesar(["ABC XYZ", 3]))
// console.log(decryptVigenere(["PRINTMOUSELINUXDEBUGMEDIA", "BROWSER"]))

/*
143+189+153+76+172+43+187+141+164+136

 */
