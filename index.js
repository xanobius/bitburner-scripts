import { solveSum, solveSumTwo } from "./cct_sum.js"
import { arrayJumper, testCases as AJTestCases } from "./cct_arrayjump.js"
import { mergeIntervals } from "./cct_mergeIntervals.js";
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

const fakeNs = {
  tprint : (a) => { console.log(a) }
}

// decodeHamming('1101100100111101011111110011111010')
// decodeHamming('1001101011')
//testStuff(arrayJumper, fakeNs,  AJTestCases)
//console.log(getValidMathExpressions(["45996034436", 20]))

console.log(stockTradeV4([4, [8,82,127,143,149,96,179,112,163,200,3,159,156,5,59,138,123,52,5,117,165,125,53,84,191,118,83,109,41,138,66,29,58,82,137,173,106,111,19,135,39,169,25,133,88,99,16,90]]))
// console.log(stockTradeV4([3, [-1, 5, 13, 33, 53, 73, 93, 113, 123, 153, 0, 200,13, 201, 3, 200, 0, 200]]))
// console.log(stockTradeV4([ 3, [99,88,77,11,1]]))

/*
8 200
3 159
5 191
29 173

192+156+186+144 -> 678

5 165
53 191

192+156+160+138
 */

// wG1H6gt0WH6gt0WHjc6a22EuY154FdoO264gg264ggFdoO264ggDe742D8842l4793wSm693wSm6ggDe742D8842l4793wSm682FQ82FQ82FD8842l4793wSm682FQ82FQ82FQl4793wSm682FQ3wSm682FQwSm682FQwSm682FQFQ

/*
'contract-51362.cct' (Find Largest Prime Factor) @ sigma-cosmetics yet
'contract-760245.cct' (Compression II: LZ Decompression) @ hong-fang-tea yet
'contract-872911.cct' (Compression III: LZ Compression) @ harakiri-sushi yet
'contract-661035.cct' (Merge Overlapping Intervals) @ max-hardware yet
'contract-866336.cct' (Unique Paths in a Grid II) @ phantasy yet
- 'contract-576458.cct' (Algorithmic Stock Trader IV) @ omega-net yet
'contract-882676.cct' (Subarray with Maximum Sum) @ omega-net yet
'contract-900256.cct' (Total Ways to Sum II) @ catalyst yet
'contract-509743-CyberSec.cct' (Array Jumping Game) @ rothman-uni yet
'contract-497198.cct' (Shortest Path in a Grid) @ omnia yet
'contract-381269.cct' (Array Jumping Game II) @ nova-med yet
'contract-120667.cct' (Proper 2-Coloring of a Graph) @ zb-def yet
'contract-579362.cct' (Subarray with Maximum Sum) @ microdyne yet
'contract-422481-CyberSec.cct' (Spiralize Matrix) @ fulcrumtech yet
'contract-199232.cct' (Shortest Path in a Grid) @ omnitek yet
'contract-443065.cct' (Sanitize Parentheses in Expression) @ omnitek yet
'contract-491256.cct' (Merge Overlapping Intervals) @ clarkinc yet
 */
