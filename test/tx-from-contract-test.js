describe("************ Tx from contract ******************", () => {
    let target, caller;

    before(async () => {
        targetAddress = "0xa532294c1Cee1001b5e6BEF791A04de4239152E9";
        callerAddress = "0x65E960dC60c292C03DC0e35e2FbD15825bb8856E";

        owner = await reef.getSignerByName("account1");

        console.log("\tdeploying Target contract...");
        const Target = await reef.getContractFactory("Target", owner);
        if (!targetAddress) {
            target = await Target.deploy({
                value: (maxGasFee = ethers.utils.parseUnits("30", "ether")),
            });
            await target.deployed();
        } else {
            target = await Target.attach(targetAddress);
        }

        const Caller = await reef.getContractFactory("Caller", owner);
        if (!callerAddress) {
            caller = await Caller.deploy();
            await caller.deployed();
        } else {
            caller = await Caller.attach(callerAddress);
        }
    });

    it("Should withdraw from caller", async () => {
        const tx = await caller.withdrawFromTarget(target.address, {
            gasLimit: 1000000000,
            customData: { storageLimit: 1000000000 },
        });
        const receipt = await tx.wait();
        console.log("amount:", receipt.events[0].args.amount);
    });
});
