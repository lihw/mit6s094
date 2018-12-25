//<![CDATA[

// a few things don't have var in front of them - they update already existing variables the game needs
// TODO: tweak the following parameters according to the paper.
//---------------------------------
lanesSide = 3;
patchesAhead = 50;
patchesBehind = 10;
trainIterations = 1000000;
//---------------------------------

// the number of other autonomous vehicles controlled by your network
otherAgents = 0; // max of 10

var num_inputs = (lanesSide * 2 + 1) * (patchesAhead + patchesBehind);
var num_actions = 5;
var temporal_window = 0;
var network_size = num_inputs * temporal_window + num_actions * temporal_window + num_inputs;

var layer_defs = [];
    layer_defs.push({
    type: 'input',
    out_sx: 1,
    out_sy: 1,
    out_depth: network_size
});
// TODO: add more layers
//---------------------------------
layer_defs.push({
    type: 'fc',
    num_neurons: num_inputs,
    activation: 'relu',
    drop_prob: 0.1
});
layer_defs.push({
    type: 'fc',
    num_neurons: num_inputs / 2,
    activation: 'relu'
    drop_prob: 0.1
});
layer_defs.push({
    type: 'fc',
    num_neurons: num_inputs / 4,
    activation: 'relu'
    drop_prob: 0.1
});
layer_defs.push({
    type: 'fc',
    num_neurons: num_inputs / 8,
    activation: 'relu'
    drop_prob: 0.1
});
layer_defs.push({
    type: 'fc',
    num_neurons: 20,
    activation: 'relu'
});
layer_defs.push({
    type: 'fc',
    num_neurons: 10,
    activation: 'relu'
});
//---------------------------------
layer_defs.push({
    type: 'regression',
    num_neurons: num_actions
});

var tdtrainer_options = {
    learning_rate: 0.001,
    momentum: 0.0,
    batch_size: 64,
    l2_decay: 0.01
};

var opt = {};
opt.temporal_window = temporal_window;
opt.experience_size = 3000;
opt.start_learn_threshold = 500;
kpt.gamma = 0.9;
opt.learning_steps_total = 10000;
opt.learning_steps_burnin = 1000;
opt.epsilon_min = 0.1;
opt.epsilon_test_time = 0.00;
opt.layer_defs = layer_defs;
opt.tdtrainer_options = tdtrainer_options;

brain = new deepqlearn.Brain(num_inputs, num_actions, opt);

learn = function (state, lastReward) {
brain.backward(lastReward);
var action = brain.forward(state);

draw_net();
draw_stats();

return action;
}

//]]>

