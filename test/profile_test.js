const Profile = artifacts.require("Profile");

contract("Profile", function(accounts) {
  const owner = accounts[0];
  const testUsername = "testuser";
  const testFirstName = "John";
  const testLastName = "Doe";
  const testEmail = "john.doe@example.com";
  
  let profileInstance;

  beforeEach(async function() {
    profileInstance = await Profile.new({ from: owner });
  });

  it("should set and get profile correctly", async function() {
    // Set the profile
    await profileInstance.setProfile(
      testUsername, 
      testFirstName, 
      testLastName, 
      testEmail, 
      { from: owner }
    );

    // Get the profile
    const profile = await profileInstance.getProfile({ from: owner });
    
    assert.equal(profile[0], testUsername, "Username was not stored correctly");
    assert.equal(profile[1], testFirstName, "First name was not stored correctly");
    assert.equal(profile[2], testLastName, "Last name was not stored correctly");
    assert.equal(profile[3], testEmail, "Email was not stored correctly");
  });

  it("should remove profile correctly", async function() {
    // Set the profile first
    await profileInstance.setProfile(
      testUsername, 
      testFirstName, 
      testLastName, 
      testEmail, 
      { from: owner }
    );

    // Remove the profile
    await profileInstance.removeProfile({ from: owner });

    // Get the profile after removal
    const profile = await profileInstance.getProfile({ from: owner });
    
    assert.equal(profile[0], "", "Username should be empty after removal");
    assert.equal(profile[1], "", "First name should be empty after removal");
    assert.equal(profile[2], "", "Last name should be empty after removal");
    assert.equal(profile[3], "", "Email should be empty after removal");
  });

  it("should handle multiple users correctly", async function() {
    const user1 = accounts[1];
    const user2 = accounts[2];
    
    // Set profile for user1
    await profileInstance.setProfile(
      "user1", 
      "Alice", 
      "Smith", 
      "alice@example.com", 
      { from: user1 }
    );
    
    // Set profile for user2
    await profileInstance.setProfile(
      "user2", 
      "Bob", 
      "Jones", 
      "bob@example.com", 
      { from: user2 }
    );
    
    // Check user1's profile
    const profile1 = await profileInstance.getProfile({ from: user1 });
    assert.equal(profile1[0], "user1", "Username for user1 incorrect");
    
    // Check user2's profile
    const profile2 = await profileInstance.getProfile({ from: user2 });
    assert.equal(profile2[0], "user2", "Username for user2 incorrect");
  });
});