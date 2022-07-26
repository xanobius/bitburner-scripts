// import { solveSum } from "./cct_sum.js"
// import { arrayJumper, testCases as AJTestCases } from "./cct_arrayjump.js"
// import { compressRle, decompressLZ, lzDecompressTestCases, rleTestCases as RLETestCases } from "./cct_compressions.js"
// import { generateIp, testCases } from "./cct_generateIps.js";
import { getValidMathExpressions, testCases } from "./cct_validMathExpressions.js";
import { testStuff } from "./cct_helpers.js"

const fakeNs = {
  tprint : (a) => { console.log(a) }
}

testStuff(getValidMathExpressions, fakeNs,  testCases)
