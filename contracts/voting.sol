// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting {
    struct Candidate {
        uint256 id;
        string name;
        uint256 votesCount;
    }

    Candidate[] private candidates;
    mapping (address => uint256) private votes;

    constructor() {
        // Инициализация нескольких кандидатов
        candidates.push(Candidate(1, unicode"Кандидат 1", 0));
        candidates.push(Candidate(2, unicode"Кандидат 2", 0));
        candidates.push(Candidate(3, unicode"Кандидат 3", 0));
    }

    function _getCandidateIndexById(uint256 candidateId) private view returns(uint256) {
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].id == candidateId) {
                return i;
            }
        }
        return candidates.length;
    }

    function vote(uint256 index) public {
        if (index >= candidates.length) return;
        uint256 votedIndex = _getCandidateIndexById(votes[msg.sender]);
        bool isNewVote = votedIndex == candidates.length;

        // Если это новый голос
        if (isNewVote) {
            candidates[index].votesCount++;
        } else {
            // Если пользователь меняет голос
            candidates[votedIndex].votesCount--;
            candidates[index].votesCount++;
        }

        votes[msg.sender] = candidates[index].id;
    }

    function getVote() public view returns (Candidate memory) {
        uint256 votedIndex = _getCandidateIndexById(votes[msg.sender]);
        if (votedIndex == candidates.length) revert("No votes");
        return candidates[votedIndex];
    }

    function removeVote() public {
        uint256 votedIndex = _getCandidateIndexById(votes[msg.sender]);
        if (votedIndex == candidates.length) revert("No votes");
        
        // Уменьшаем счетчик голосов у кандидата
        candidates[votedIndex].votesCount--;
        
        // Удаляем запись о голосе пользователя
        delete votes[msg.sender];
    }

    function summary() public view returns (Candidate[] memory) {
        return candidates;
    }
}