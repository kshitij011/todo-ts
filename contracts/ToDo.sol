// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ToDo is Ownable(msg.sender){
    uint public taskId;

    struct Task{
        string title;
        string description;
        bool status;
    }

    // Multiple owners can create Todos
    mapping(address => mapping( uint => Task)) tasks;

    event TaskCreated(address indexed user, uint indexed taskId, string title);
    event TaskUpdated(address indexed user, uint indexed taskId, string title);
    event TaskCompleted(address indexed user, uint indexed taskId);
    event TaskDeleted(address indexed user, uint indexed taskId);

    modifier onlyTaskOwner(uint _taskId) {
        require(bytes(tasks[msg.sender][_taskId].title).length > 0, "Task does not exist");
        _;
    }

    function addTask(string calldata _title, string calldata _description) external {
        taskId++;
        tasks[msg.sender][taskId] = Task(_title, _description, false);

        emit TaskCreated(msg.sender, taskId, _title);
    }

    function markComplete(uint _taskId) external onlyTaskOwner(_taskId) {
        tasks[msg.sender][_taskId].status = true;
        emit TaskCompleted(msg.sender, _taskId);
    }

    function editTask(uint _taskId, string calldata _title, string calldata _description) external onlyTaskOwner(_taskId) {
        tasks[msg.sender][_taskId].title = _title;
        tasks[msg.sender][_taskId].description = _description;

        emit TaskUpdated(msg.sender, _taskId, _title);
    }

    function deleteTask(uint _taskId) external onlyTaskOwner(_taskId) {
        delete tasks[msg.sender][_taskId];

        emit TaskDeleted(msg.sender, _taskId);
    }

    function getAllTask() external view returns(Task[] memory){
        Task[] memory allTasks = new Task[](taskId);
        uint count = 0;

        for (uint i = 1; i<= taskId; i++) {
            if(bytes(tasks[msg.sender][i].title).length > 0){
                allTasks[count] = tasks[msg.sender][i];
                count++;
            } else {
                continue;
            }
        }
        return allTasks;
    }
}