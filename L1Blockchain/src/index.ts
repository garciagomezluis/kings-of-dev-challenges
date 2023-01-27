import "./styles.css";
/// You can use either one of the following imports:
import { BigNumber, ethers } from "ethers";
//import { ethers } from "ethers";

/// Contains needed settings, as nodeUrl, contractAddress, and abi
import { settings } from "./settings";

/// This is a definition of the type of object returned by the contract
/// and is what the addProposalToList function expects as input parameter
import { Proposal } from "./Proposal";

/// Allows to add a proposal to the list
import { addProposalToList } from "./utils";

/// Empties the list
import { resetList } from "./utils";

/// Set the app loading status to true or false
import { setLoading } from "./utils";

const main = async () => {
  setLoading(true);

  const provider = new ethers.providers.JsonRpcProvider(settings.nodeUrl);

  const ballot = new ethers.Contract(
    settings.contractAddress,
    settings.contractAbi,
    provider
  );

  const rawAmountProposals = await ballot.getProposalsCount();
  const amountProposals = await rawAmountProposals.toNumber();

  const rawProposals = await Promise.all(
    Array(amountProposals)
      .fill("")
      .map((_, i) => ballot.proposals(BigNumber.from(i)))
  );

  for (let i = 0; i < amountProposals; i++) {
    const [name, voteCount] = rawProposals[i];

    const proposal: Proposal = {
      name,
      voteCount: voteCount.toNumber()
    };

    addProposalToList(proposal);
  }

  setLoading(false);
};

main();
