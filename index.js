import { solveSum,  } from "./cct_sum.js"
// import { arrayJumper, testCases as AJTestCases } from "./cct_arrayjump.js"
// import { compressRle, decompressLZ, lzDecompressTestCases, rleTestCases as RLETestCases } from "./cct_compressions.js"
// import { generateIp, testCases } from "./cct_generateIps.js";
// import { getValidMathExpressions, testCases } from "./cct_validMathExpressions.js";
// import { stockTradeV2, stockTradeV3, stockTradeV4, v2TestCases, v3TestCases, v4TestCases } from "./cct_stocks.js";
import { decodeHamming, encodeTestCases, decodeTestCases} from "./cct_hamming.js";
import { testStuff } from "./cct_helpers.js"

const fakeNs = {
  tprint : (a) => { console.log(a) }
}

// decodeHamming('1101100100111101011111110011111010')
// decodeHamming('1001101011')
testStuff(decodeHamming, fakeNs,  decodeTestCases)
