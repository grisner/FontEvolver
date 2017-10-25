"use strict";

import {individual} from './backend';
import {generation} from './backend';


interface IBreed {
    parent1: individual,
    parent2: individual
}

interface INextGeneration {
    oldGen: generation,
    chosen?: individual[]
}


export {IBreed, INextGeneration};