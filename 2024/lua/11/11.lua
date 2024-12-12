local stones = {}

for line in io.lines("input") do
	for stone in string.gmatch(line, "([^ ]+)") do
		stones[tonumber(stone)] = (stones[tonumber(stone)] or 0) + 1
	end
end

local function stones_after_blink(current_stones)
	local new_stones = {}
	for stone, amount in pairs(current_stones) do
		if stone == 0 then
			new_stones[1] = (new_stones[1] or 0) + amount
		elseif #tostring(stone) % 2 == 0 then
			local stone_string = tostring(stone)
			local stone_1 = tonumber(stone_string:sub(1, #stone_string / 2)) or 0
			local stone_2 = tonumber(stone_string:sub((#stone_string / 2) + 1, #stone_string)) or 0
			new_stones[stone_1] = (new_stones[stone_1] or 0) + amount
			new_stones[stone_2] = (new_stones[stone_2] or 0) + amount
		else
			new_stones[stone * 2024] = (new_stones[stone * 2024] or 0) + amount
		end
	end
	return new_stones
end

local function solution(blinks)
	local current_stones = stones
	local result = 0

	for _ = 1, blinks do
		current_stones = stones_after_blink(current_stones)
	end

	for _, stone_amount in pairs(current_stones) do
		result = result + stone_amount
	end

	return result
end

print(solution(25))
print(solution(75))
