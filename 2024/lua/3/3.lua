local input = io.open("example"):read("*a")

local function part_one()
	local pattern = "mul%((%d%d?%d?),(%d%d?%d?)%)"
	local result = 0
	for x, y in string.gmatch(input, pattern) do
		result = result + x * y
	end

	return result
end

print(part_one())
