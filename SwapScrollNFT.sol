// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SwapScrollNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor(address initialOwner) ERC721("SwapScroll", "SWAPNFT") Ownable(initialOwner) {
        tokenCounter = 1;
    }

    function mintScroll(address to, string memory metadataURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, metadataURI);
        tokenCounter++;
        return newTokenId;
    }

    function burnScroll(uint256 tokenId) public {
        require(
            msg.sender == ownerOf(tokenId) || 
            getApproved(tokenId) == msg.sender || 
            isApprovedForAll(ownerOf(tokenId), msg.sender),
            "Caller is not owner nor approved"
        );
        _burn(tokenId);
    }
}
