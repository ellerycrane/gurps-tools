var dieRoll = function (n) {
  var result = 0;
  for (let i = 0; i < n; i++) {
    var value = Math.floor(Math.random() * 6) + 1;
    result = result + value;
  }
  return result;
}

var rollTest = function () {
  return dieRoll(3);
}

var computeResult = function (effectiveSkill, roll) {
  let
    critSuccess = roll <= 4 || (roll <= 6 && effectiveSkill >= roll + 10),
    critFailure = roll === 18 || (roll === 17 && effectiveSkill <= 15) || (roll - 10 >= effectiveSkill),
    success = critSuccess || (roll < 17 && roll <= effectiveSkill && !critFailure),
    failure = critFailure || (!critSuccess && (roll === 17 || (roll > effectiveSkill))),
    margin = effectiveSkill - roll,
    result = {
      roll, critSuccess, critFailure, success, failure, margin
    }

  if (success && failure) {
    console.log("Problem: both sucesss and failure are true:", result)
  }

  if (!success && !failure) {
    console.log("Problem: both sucesss and failure are false:", result)
  }

  return result
}

var performTest = function (effectiveSkill) {
  let
    roll = rollTest(),
    result = computeResult(effectiveSkill, roll)


  return result
}

var quickContest = function (attackerSkill, defenderSkill) {
  let
    attackerResult = performTest(attackerSkill),
    defenderResult = performTest(defenderSkill),
    attackerWins = (attackerResult.success && defenderResult.failure) ||
      (attackerResult.success && defenderResult.success && attackerResult.margin > defenderResult.margin) ||
      (attackerResult.failure && defenderResult.failure && attackerResult.margin > defenderResult.margin),
    isTie = attackerResult.success === defenderResult.success && attackerResult.margin === defenderResult.margin,
    defenderWins = !attackerWins && !isTie,
    result = isTie ? 'tie' : (attackerWins ? 'attacker' : 'defender')

  return {
    attackerWins, isTie, defenderWins,
  }
}


var calcSuccess = function (skill) {

  const
    numTimes = 10000000

  var numSuccesses = 0;

  for (var i = 0; i <= numTimes; i++) {
    let r = performTest(skill)
//  console.log(`Test ${i}:`, performTest(10));
    if (r.success) {
      numSuccesses++
    }
  }
  let
    success = (numSuccesses / numTimes * 100).toFixed(2),
    result = {skillLevel: skill, probabilityOfSuccess: success}

  console.log(result)
  return result
}


var printSkillProbs = function () {
  let probs = {}
  for (var i = 3; i <= 18; i++) {
    let rate = calcSuccess(i)
    probs[rate.skillLevel] = rate
  }

  console.log(JSON.stringify(probs, null, 2))
}


var calcOpposedTest = function (aSkill, bSkill) {

  const
    numTimes = 1000000

  var numSuccesses = 0,
    numTies = 0,
    numLosses = 0

  for (var i = 0; i <= numTimes; i++) {
    let r = quickContest(aSkill, bSkill)
    //  console.log(`Test ${i}:`, performTest(10));
    if (r.attackerWins) {
      numSuccesses++
    }
    if (r.defenderWins) {
      numLosses++
    }
    if (r.isTie) {
      numTies++
    }
  }


  let result = {
    skillLevel: aSkill,
    opposedSkillLevel: bSkill,
    probabilityOfSuccess: (numSuccesses / numTimes * 100).toFixed(2),
    probabilityOfTie: (numTies / numTimes * 100).toFixed(2)
  }
  //console.log(result)
  return result


}

/* var skill = 10
calcOpposedTest(skill, skill-5)
skill = 18
calcOpposedTest(skill, skill-5)
skill = 20
calcOpposedTest(15, 16)
 */

//console.log(JSON.stringify(probs, null, 2))
let quickContestProbs = {}
for (var i = 3; i <= 30; i++) {
  quickContestProbs[i] = {}
  for (var k = 3; k <= 30; k++) {
    quickContestProbs[i][k] = calcOpposedTest(i, k)
  }
}

console.log(JSON.stringify(quickContestProbs, null, 2))