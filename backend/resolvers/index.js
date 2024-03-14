import { mergeResolvers, mergeResolvers } from "@graphql-tools/merge";

import userResolver from "./user.resolver";
import transactionResolver from "./transaction.resolver";

const mergeResolvers = mergeResolvers([userResolver,transactionResolver]);

export default mergeResolvers