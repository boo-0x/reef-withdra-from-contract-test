pragma solidity ^0.8.4;

contract Caller {
    event Received(uint256 indexed amount);

    receive() external payable {
        emit Received(msg.value);
    }

    function withdrawFromTarget(Target target) external {
        target.withdraw();
    }
}

contract Target {
    constructor() payable {}

    receive() external payable {}

    function withdraw() external {
        (bool successTx, ) = msg.sender.call{ value: 1 wei }("");
        if (!successTx) {
            revert("Tx error");
        }
    }
}
