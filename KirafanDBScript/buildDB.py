import os
import csv
import urllib.request

path = "https://gitlab.com/kirafan/database/-/raw/master/database/"

data = {}
classes = { "0": "Warrior",
            "1": "Mage",
            "2": "Priest",
            "3": "Knight",
            "4": "Alchemist" }
elements = { "0": "Fire",
             "1": "Water",
             "2": "Earth",
             "3": "Wind",
             "4": "Moon",
             "5": "Sun" }

seriesname = { "Hidamari": "Hidamari Sketch",
               "YuyuShiki": "Yuyushiki",
               "Gakkou": "Gakkou Gurashi",
               "AChannel": "A-Channel",
               "KinMosa": "Kin`iro Mosaic",
               "NewGame": "New Game!",
               "Stella": "Stella no Mahou",
               "Urara": "Urara Meirochou",
               "Killme": "Kill Me Baby",
               "Sakura": "Sakura Trick",
               "Blends": "Blend S",
               "SlowStart": "Slow Start",
               "Keion": "K-ON!",
               "Yurukyan": "Yuru Camp",
               "Komiga": "Comic Girls",
               "GA": "GA: Geijutsuka Art Design Class",
               "Yumekui": "Yumekui Merry",
               "Hanayamata": "Hanayamata",
               "Anhapi": "Anne Happy",
               "Harukana": "Harukana Receive",
               "Gochiusa": "Gochuumon Usagi desu ka?",
               "Anima": "Anima Yell",
               "Kirara": "Kirara Fantasia",
               "Sansha": "Sansha Sanyou",
               "Hitugi": "Hitsugi Katsugi no Kuro. ~Kaichuu Tabi no Wa~",
               "Matikado": "Machikado Mazoku",
               "Harumination": "Harumination",
               "Koufuku": "Koufuku Graffitti" }

#Load card data
with urllib.request.urlopen(path + "CharacterList.csv") as response:
    chars = response.read().decode("utf-8").strip("\ufeff").split("\r\n")[1:]
    csvchars = csv.DictReader(chars, ["m_CharaID","m_ResourceID","m_DedicatedAnimType","m_HeadID","m_BodyID","m_DispScale","m_CRILabel","m_Name","m_NamedType","m_Rare","m_Class","m_Element","m_Cost","m_GrowthTableID","m_InitLv","m_InitLimitLv","m_InitHp","m_InitAtk","m_InitMgc","m_InitDef","m_InitMDef","m_InitSpd","m_InitLuck","m_LeaderSkillID","m_SkillLimitLv","m_CharaSkillID","m_CharaSkillExpTableID","m_ClassSkillIDs","m_ClassSkillExpTableIDs","m_StunCoef","m_AltItemID","m_AltItemAmount","m_FULLOPEN","m_LimitBreakRecipeID","isWeaken","isDistributed","isPeriodLimited"])
    for row in csvchars:
        if int(row["m_CharaID"]) % 10 == 0:
            entry = {
                "name": row["m_Name"],
                "characterid": row["m_CharaID"],
                "profileid": row["m_NamedType"],
                "attribute": elements[row["m_Element"]],
                "class": classes[row["m_Class"]],
                "rarity": int(row["m_Rare"]) + 1
            }
            data[row["m_CharaID"]] = entry

#Append series name
with urllib.request.urlopen(path + "NamedList.csv") as response:
    named = response.read().decode("utf-8").strip("\ufeff").split("\r\n")[1:]
    csvnamed = csv.DictReader(named, ["m_NamedType","m_TitleType","m_ResouceBaseName","m_NickName","m_FullName","m_BattleWinID","m_FriendshipTableID","m_PersonalityType","m_ProfileText","m_CVText","m_DropItemKey","formalStatus","crossAdvList","primaryCharacterID","fullName"])
    profiles = {}
    for row in csvnamed:
        profiles[row["m_NamedType"]] = row["m_ResouceBaseName"].split("_")[0]
    
    for row in data:
        data[row]["series"] = seriesname[profiles[data[row]["profileid"]]]

#Append weaponevo
with urllib.request.urlopen(path + "WeaponList.csv") as response:
    weapons = response.read().decode().strip("\ufeff").split("\r\n")[1:]
    csvweapons = csv.DictReader(weapons, ["m_ID","m_WeaponName","m_Rare","m_ClassType","m_Cost","m_ControllType","m_ResourceID_L","m_ResourceID_R","m_ExpTableID","m_InitLv","m_LimitLv","m_EvolvedCount","m_InitAtk","m_InitMgc","m_InitDef","m_InitMDef","m_MaxAtk","m_MaxMgc","m_MaxDef","m_MaxMDef","m_SkillID","m_SkillLimitLv","m_SkillExpTableID","m_SaleAmount","m_CanSell","m_UpgradeBonusMaterialItemIDs","m_PassiveSkillID","m_EquipableCharaID","default","maxEvolution"])
    weaponevo = {}
    for row in csvweapons:
        if (row["m_EquipableCharaID"] != "-1"):
            weaponevo[int(row["m_EquipableCharaID"]) - 1] = row["maxEvolution"]

    for row in data:
        data[row]["weaponevo"] = weaponevo.get(int(data[row]["characterid"]), 0)

#Write Database
with open("KirafanDB.csv", "w", encoding="utf-8") as database:
    database.write("name,series,class,attribute,rarity,weaponevo\n")
    for row in data:
        database.write(f"{data[row]['name']},{data[row]['series']},{data[row]['class']},{data[row]['attribute']},{data[row]['rarity']},{data[row]['weaponevo']}\n")