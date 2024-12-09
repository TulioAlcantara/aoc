local input = io.open("input"):read("*a")

local function part_one()
	local result = 0
	for x, y in string.gmatch(input, "mul%((%d%d?%d?),(%d%d?%d?)%)") do
		result = result + x * y
	end

	return result
end

local function part_two()
	local normalized_input = "do()" .. input .. "don't()"
	local result = 0

	for group in normalized_input:gmatch("do%(%)(.-)don't%(%)") do
		for x, y in string.gmatch(group, "mul%((%d%d?%d?),(%d%d?%d?)%)") do
			result = result + x * y
		end
	end

	return result
end

print(part_one())
print(part_two())
