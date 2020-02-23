const SongRegistry = artifacts.require("./SongRegistry.sol")

contract("SongRegistry", function(accounts){
    // predefine contat instance
    let SongRegistryInstance

    // before each test, create a new contract instance
    beforeEach (async function (){
        SongRegistryInstance = await SongRegistry.new()
    })
    //first test
    it ("Should add a song to the registry", async function(){
        await SongRegistryInstance.register("Cool Song", " example.com", 1, {"from": accounts[0]})
        let song = await SongRegistryInstance.songs(0)
        assert.equal(song.title, "Cool Song", "Title has not been set correctly." )
        assert.equal(song.owner, accounts[0], "Owner is not account 0")
    })
    // second test
    it ("A song can be bought", async function(){
        await SongRegistryInstance.register("Watch the throne", "Apple music", 1, {"from": accounts[0]})
        await SongRegistryInstance.buy(1, {"from": accounts[1], "value": 1})
        let songbought = await SongRegistryInstance.isBuyer(1, {"from": accounts[1]} )
        assert.equal(songbought, true, "Cannot buy song")
    })
    //third test
    it("the number of songs increases with a new registration", async function(){
        await SongRegistryInstance.register("Watch the throne", "Apple music", 1, {"from": accounts[0]})
        await SongRegistryInstance.register("Marvins's room", "Apple music", 1, {"from": accounts[3]})
        let noOfSongs = await SongRegistryInstance.numberOfSongs()
        assert.equal(noOfSongs, 2, "Number of songs doesnot increase with a new registration")
    })

})
