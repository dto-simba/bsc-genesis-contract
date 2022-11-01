const web3 = require("web3")
const RLP = require('rlp');

// Configure
const validators = [
  {
    consensusAddr: "0x35cd261bF4F528964CC1B2370E5d7CEE91430cf5",
    feeAddr: "0x35cd261bF4F528964CC1B2370E5d7CEE91430cf5",
    bscFeeAddr: "0x35cd261bF4F528964CC1B2370E5d7CEE91430cf5",
    votingPower: 0x0000000000000064
  },
  {
   consensusAddr: "0xC5c3B9A47B455406f8a1D5D9209eacBe4bD4ed62",
   feeAddr: "0xC5c3B9A47B455406f8a1D5D9209eacBe4bD4ed62",
   bscFeeAddr: "0xC5c3B9A47B455406f8a1D5D9209eacBe4bD4ed62",
   votingPower: 0x0000000000000064
  },
  {
   consensusAddr: "0x89D4E9cE82072CEc3bBAb9eA6bFa9b399c511c50",
   feeAddr: "0x89D4E9cE82072CEc3bBAb9eA6bFa9b399c511c50",
   bscFeeAddr: "0x89D4E9cE82072CEc3bBAb9eA6bFa9b399c511c50",
   votingPower: 0x0000000000000064
  },
  {
   consensusAddr: "0x29ee4813BE7ed6F344cDe37Fe6FECd10f2BaFcdC",
   feeAddr: "0x29ee4813BE7ed6F344cDe37Fe6FECd10f2BaFcdC",
   bscFeeAddr: "0x29ee4813BE7ed6F344cDe37Fe6FECd10f2BaFcdC",
   votingPower: 0x0000000000000064
  }
];

// ===============  Do not edit below ====
function generateExtradata(validators) {
  let extraVanity =Buffer.alloc(32);
  let validatorsBytes = extraDataSerialize(validators);
  let extraSeal =Buffer.alloc(65);
  return Buffer.concat([extraVanity,validatorsBytes,extraSeal]);
}

function extraDataSerialize(validators) {
  let n = validators.length;
  let arr = [];
  for(let i = 0;i<n;i++){
    let validator = validators[i];
    arr.push(Buffer.from(web3.utils.hexToBytes(validator.consensusAddr)));
  }
  return Buffer.concat(arr);
}

function validatorUpdateRlpEncode(validators) {
  let n = validators.length;
  let vals = [];
  for(let i = 0;i<n;i++) {
    vals.push([
      validators[i].consensusAddr,
      validators[i].bscFeeAddr,
      validators[i].feeAddr,
      validators[i].votingPower,
    ]);
  }
  let pkg = [0x00, vals];
  return web3.utils.bytesToHex(RLP.encode(pkg));
}

extraValidatorBytes = generateExtradata(validators);
validatorSetBytes = validatorUpdateRlpEncode(validators);

exports = module.exports = {
  extraValidatorBytes: extraValidatorBytes,
  validatorSetBytes: validatorSetBytes,
}
