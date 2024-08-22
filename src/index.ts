#!/usr/bin/env node

import { Command } from "commander";

import { add, init } from "@/commands";

const program = new Command();

program.addCommand(init).addCommand(add).parse();
