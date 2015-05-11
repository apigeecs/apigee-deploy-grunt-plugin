var client_start_time = context.getVariable('client.received.start.timestamp');
var target_start_time = context.getVariable('target.sent.start.timestamp');
var client_end_time = context.getVariable('system.timestamp');
var target_end_time = context.getVariable('target.received.end.timestamp');

context.setVariable("total_request_time",(client_end_time-client_start_time)+'');
context.setVariable("total_target_time", (target_end_time-target_start_time)+'');

response.headers['total_request_time'] =(client_end_time-client_start_time)+'';
response.headers['total_target_time'] = (target_end_time-target_start_time)+'';