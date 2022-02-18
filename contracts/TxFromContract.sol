pragma solidity ^0.8.4;

contract Caller {
    event Received(uint256 indexed amount);

    receive() external payable {
        emit Received(msg.value);
    }

    function withdrawFromTargetCall(Target target) external {
        target.withdrawCall();
    }

    function withdrawFromTargetTransfer(Target target) external {
        target.withdrawTransfer();
    }
}

contract Target {
    constructor() payable {}

    receive() external payable {}

    function withdrawCall() external {
        (bool successTx, ) = msg.sender.call{ value: 1 wei }("");
        if (!successTx) {
            revert("Tx error");
        }
    }

    function withdrawTransfer() external {
        payable(msg.sender).transfer(1 wei);
    }
}
