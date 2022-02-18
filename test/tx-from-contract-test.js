describe("************ Tx from contract ******************", () => {
    let target, caller;

    before(async () => {
        // Set these variables as empty strings to deploy new contracts
        targetAddress = "0x00876813D23BE576D8f9EA2c12eC0acE0935f9a6";
        callerAddress = "0x0AA219A176D4853Ee29e375e86265B1E43bB56d2";

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
        console.log(`\tTarget contract deployed at ${target.address}`);

        const Caller = await reef.getContractFactory("Caller", owner);
        if (!callerAddress) {
            caller = await Caller.deploy();
            await caller.deployed();
        } else {
            caller = await Caller.attach(callerAddress);
        }
        console.log(`\tCaller contract deployed at ${caller.address}`);
    });

    it("Should withdraw from caller with transfer", async () => {
        const tx = await caller.withdrawFromTargetTransfer(target.address, {
            gasLimit: 1000000000,
            customData: { storageLimit: 1000000000 },
        });
        const receipt = await tx.wait();
        console.log("amount:", receipt.events[0].args.amount);
    });

    it("Should withdraw from caller low level call", async () => {
        const tx = await caller.withdrawFromTargetCall(target.address, {
            gasLimit: 1000000000,
            customData: { storageLimit: 1000000000 },
        });
        const receipt = await tx.wait();
        console.log("amount:", receipt.events[0].args.amount);
    });
});
