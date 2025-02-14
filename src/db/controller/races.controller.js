"use server";


  import {Race} from "@/models/associations.js";

export async function getAllRaces() {
      try {
          const races = await Race.findAll({
              order: [["id", "ASC"]],
              include: [
                  {
                      association: "units"
                  }
              ]
          });
          return JSON.parse(JSON.stringify(races));
      } catch (error) {
          console.log(error);
      }

  }


