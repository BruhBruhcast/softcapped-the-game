var clicks = new Decimal(0)
var points = new Decimal(0)
var scaps = {
    1: {
        start: new Decimal(10),
        desc: "Due to a softcap, your points above 10 have been divided by 2"
    },
    2: {
        start: new Decimal(20),
        desc: "Due to another softcap, your points above 20 have been divided by 2"
    },
    3: {
        start: new Decimal(30),
        desc: "Due to ANOTHER softcap, your points above 30 have been divided by 4"
    },
    4: {
        start: new Decimal(50),
        desc: "",
    },
}



Decimal.prototype.softcap = function(start, type, effect) {
    let x = this
    if (x.gte(start)) {
        if ([0, "mul"].includes(type)) x = x.sub(start).div(effect).add(start)
        if ([1, "pow"].includes(type)) x = x.div(start).root(effect).mul(start)
        if ([2, "exp"].includes(type)) x = start.pow(x.log(start).root(effect))
        if ([3, "tet"].includes(type)) x = start.tetrate(x.slog(start).div(effect))
    }
    return x
}

function calculate() {
    let x = clicks
    if (points.gte(10)) {x = x.sub(10).div(2).add(10)}
    if (points.gte(20)) {x = x.sub(20).div(2).add(20)}
    if (points.gte(30)) {x = x.sub(30).div(4).add(30)}
    if (points.gte(40)) {x = x.sub(40).div(4).add(40)}
    if (points.gte(50)) {x = x.div(50).root(2).mul(50)}
    if (points.gte(55)) {x = x.div(55).root(2).mul(55)}
    if (points.gte(60)) {x = x.div(60).root(3).mul(60)}
    if (points.gte(65)) {x = x.div(65).root(3).mul(65)}
    if (points.gte(70)) {x = x.div(70).root(4).mul(70)}
    if (points.gte(75)) {x = x.div(75).root(10).mul(75)}
    if (points.gte(80)) {x = x.log(10).add(80)}
    if (points.gte(85)) {x = x.log(10).add(85)}
    if (points.gte(90)) {x = x.iteratedlog(10, 2).add(90)}
    if (points.gte(91)) {x = x.iteratedlog(10, 2).add(91)}
    if (points.gte(92)) {x = x.iteratedlog(10, 3).add(92)}
    if (points.gte(93)) {x = x.iteratedlog(10, 4).add(93)}
    if (points.gte(94)) {x = x.iteratedlog(10, 10).add(94)}
    if (points.gte(95)) {x = x.iteratedlog(10, 100).add(95)}
    if (points.gte(96)) {x = x.iteratedlog(10, 1e3).add(96)}
    if (points.gte(97)) {x = x.iteratedlog(10, 1e10).add(97)}
    if (points.gte(98)) {x = x.slog(10).add(98)}
    if (points.gte(99)) {x = x.slog(10).add(99)}
    return x
}

let time_step = 1000 / 60
let last_time = null
let total_time = 0
let accumulated_lag = 0
let number_of_updates = 0

function loop(current_time) {
  if (last_time === null) last_time = current_time
  const delta_time = current_time - last_time
  total_time += delta_time
  accumulated_lag += delta_time
  last_time = current_time
  
  while (accumulated_lag >= time_step) {
    accumulated_lag -= time_step
    update(time_step, total_time)
    
    if (number_of_updates++ >= 300) {
      number_of_updates = 300
    }
  }
  
  render()
  
  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)

function update(delta_time, total_time) {
    points = calculate()
}

function render() {
    document.getElementById("clickamt").innerHTML = "Clicks: " + formatWhole(clicks)
    document.getElementById("point").innerHTML = "Points: " + format(points)
    document.getElementById("goal").innerHTML = format(new Decimal(100).sub(points)) + " more points required"
}

