const Voting = artifacts.require("Voting");

contract("Voting", function(accounts) {
  const voter1 = accounts[0];
  const voter2 = accounts[1];
  const voter3 = accounts[2];
  
  let votingInstance;

  beforeEach(async function() {
    votingInstance = await Voting.new();
  });

  it("should initialize with three candidates", async function() {
    const summary = await votingInstance.summary();
    
    assert.equal(summary.length, 3, "Should have 3 candidates");
    assert.equal(summary[0].id, 1, "First candidate should have id 1");
    assert.equal(summary[1].id, 2, "Second candidate should have id 2");
    assert.equal(summary[2].id, 3, "Third candidate should have id 3");
    
    assert.equal(summary[0].votesCount, 0, "First candidate should have 0 votes");
    assert.equal(summary[1].votesCount, 0, "Second candidate should have 0 votes");
    assert.equal(summary[2].votesCount, 0, "Third candidate should have 0 votes");
  });

  it("should register a vote correctly", async function() {
    // Vote for candidate 1 (index 0)
    await votingInstance.vote(0, { from: voter1 });
    
    // Check vote was registered
    const vote = await votingInstance.getVote({ from: voter1 });
    assert.equal(vote.id, 1, "Vote was not registered correctly");
    
    // Check vote count updated
    const summary = await votingInstance.summary();
    assert.equal(summary[0].votesCount, 1, "Vote count not updated");
  });

  it("should allow changing vote", async function() {
    // Vote for candidate 1 (index 0)
    await votingInstance.vote(0, { from: voter1 });
    
    // Change vote to candidate 2 (index 1)
    await votingInstance.vote(1, { from: voter1 });
    
    // Check vote was changed
    const vote = await votingInstance.getVote({ from: voter1 });
    assert.equal(vote.id, 2, "Vote was not changed correctly");
    
    // Check vote counts updated
    const summary = await votingInstance.summary();
    assert.equal(summary[0].votesCount, 0, "Original candidate vote count not decremented");
    assert.equal(summary[1].votesCount, 1, "New candidate vote count not incremented");
  });

  it("should allow removing vote", async function() {
    // Vote for candidate 1 (index 0)
    await votingInstance.vote(0, { from: voter1 });
    
    // Remove vote
    await votingInstance.removeVote({ from: voter1 });
    
    // Check vote counts updated
    const summary = await votingInstance.summary();
    assert.equal(summary[0].votesCount, 0, "Vote count not decremented after removal");
    
    // Check that trying to get vote now fails
    try {
      await votingInstance.getVote({ from: voter1 });
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert(error.message.includes("No votes"), "Expected 'No votes' error");
    }
  });

  it("should handle multiple voters correctly", async function() {
    // Voter1 votes for candidate 1 (index 0)
    await votingInstance.vote(0, { from: voter1 });
    
    // Voter2 votes for candidate 2 (index 1)
    await votingInstance.vote(1, { from: voter2 });
    
    // Voter3 votes for candidate 1 (index 0)
    await votingInstance.vote(0, { from: voter3 });
    
    // Check summary
    const summary = await votingInstance.summary();
    assert.equal(summary[0].votesCount, 2, "Candidate 1 should have 2 votes");
    assert.equal(summary[1].votesCount, 1, "Candidate 2 should have 1 vote");
    assert.equal(summary[2].votesCount, 0, "Candidate 3 should have 0 votes");
  });
});