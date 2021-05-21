import {characdb} from '../database'
import ICharacter from './character';


const voteCharacter = async (characterName:string):Promise<ICharacter | undefined> => {
    let charac= await characdb.query((e: any) => e.name == characterName);
    if (charac.length <= 0){
      console.log("character not already in db: " + JSON.stringify(charac,null,5));
      return undefined;
    }
    if(!charac[0]._id) {
        console.log("no id found in the character");
        return undefined;
    }


    try {
        await characdb.del(charac[0]._id);
        charac[0].votes++;
        console.log(`updated votes for charcter: ${JSON.stringify(charac[0],null,4)}`);
        await characdb.put(charac[0]);
        return charac;
    }catch(err) {
        console.log(`vote charac function failure: ${err}`);
        return undefined;
    }
}

export default voteCharacter;