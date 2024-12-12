package = "lua"
version = "dev-1"
source = {
   url = "git+ssh://git@github.com/TulioAlcantara/aoc.git"
}
description = {
   homepage = "*** please enter a project homepage ***",
   license = "*** please specify a license ***"
}
build = {
   type = "builtin",
   modules = {
      ["1.1"] = "1/1.lua",
      ["2.2"] = "2/2.lua",
      ["3.3"] = "3/3.lua",
      ["4.4"] = "4/4.lua",
      ["5.5"] = "5/5.lua",
      ["6.6"] = "6/6.lua",
      ["7.7"] = "7/7.lua",
      ["8.8"] = "8/8.lua",
      ["9.9"] = "9/9.lua"
   }
}
