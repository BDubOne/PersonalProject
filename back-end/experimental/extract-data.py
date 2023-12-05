import re
import json

# Sample PDF content (replace with actual PDF text)
pdf_text = """
1 (prime) The Monad
Names for the number 1: see 12, 21, 37, 397, 422 or 1552, 620, 721, 559, 736, 837.
"The union of higher reality, the upper Yod, with the lower
reality, the lower Yod, by means of the connecting Vav, of Torah,
is the ultimate secret of the letter Aleph." [The Alef-Beit, Rabbi
Ginsburgh] See 214 (RVCh], 37, 111 [ALP].
The number 1 stands for definite quantity, in contrast to the lack
of definition symbolized by 0. 1 is the sign of the aspect of
unity of which Eliphas Levi says: Unity may be conceived as
relative, manifested, possessing duality, the beginning of
numerical sequence. 1 represents the initial impulse of movement,
the outset of a cycle of activity, the beginning of some phase of
manifested power. Synonyms for beginning, prelude, opening,
threshold, foundation, beginning is introduction. To introduce is
to lead in, to insert; to put or thrust in. Thus the phallic
meanings of 1 are inseparable from fundamental ideas which
humanity associates with beginning.
Aleph [A]. "bull" or "ox". Oxen are symbols of the taming of
natural forces. Thus the letter Aleph is a symbol of creative
energy, and of the vital principles of living creatures. This
vital principle comes to us in physical form as the radiant energy
from the sun. The its association with the Key 0, the Fool, Aleph
is the special sign for air and breath. The noun "fool," is
derived from the Latin follis, meaning a "bag of wind".
Oxen were the motive-power in the early civilizations where the
alphabet of occultism was invented. They were used to plow fields,
to thresh grain, and to carry heavy burdens. Agriculture is the
basis of civilization, hence the ox represents the power at work
in every activity whereby man makes use of the forces surrounding
him, and adapts them to the realization of his purposes. Culture
power and Super-consciousness. The Life Power is the force behind
growth and development.
The activity represented by Aleph is one whereby the one reflects
itself to itself, and so produces the number 2. Wisdom (Chokmah)
is the Life-power's perception of what it is, in itself.
Fabre D'Olivet comments: "A. First character of the alphabet in
nearly all know idioms. As symbolic image it represents universal
man, mankind, the ruling being of the earth. In its hieroglyphic
acceptation, it characterizes unity, the central point, the
abstract principle of a thing. As sign, it expresses power,
stability, continuity. Some grammarians make it express a kind of
superlative as in Arabic; but this is only a result of its power
as sign. On some rare occasions it takes the place of the emphatic
article Heh either at the beginning or at the end of the words.
The rabbis use it as a sort of article. It is often added at the
head of words as redundant vowel, to make them more sonorous and
to add to their expression." [The Hebrew Tongue Restored, p.287]
Greek
Alpha. Signifies, like the Hebrew Aleph, the beginning or a cycle
of activity. It was one of the primary figures of the Gnostic
mystery of Alpha and Omega, and was represented by the
Tetrahedron, which it resembled in its primitive form. see 40,
200, 800, 811. [Bond and Lea: Investigation of the Cabala, page
83.]
2 (prime) The Duad or Dyad.
Names for number 2: see 15, 37, 73.
B Beth. "house". Refers to whatever form may be termed a
dwelling-place for Spirit, and the form particular referred to is
human personality. "The Father who dwells in me, he does the
works."
Fabre D'Olivet comments: "B. this character, as consonant, belongs
to the labial sound. As symbolic image it represents the mouth of
man, his dwelling, his interior. As grammatical sign, it is the
paternal and virile sign, that of interior and active action. In
Hebrew, it is the integral and indicative article expressing in
nouns or actions... almost the same movement as the extractive
article Mem, but with more force and without any extraction or
division of parts." [The Hebrew Tongue Restored, p.300-301]
Considered as the second aspect of unity, the "One possessing
duality." Many of the meaning of the number 2 are related to the
High Priestess (See 73, 106, 412). It was because of the powers of
the number 2 that 2 was selected by God to begin creation [Zohar].
"Beth is drawn with two little points--one pointing above, the
other pointing behind and toward the right. In this way when
someone asks the Beth "Who made you?," it points above, and if
they ask, What is his name?," it points toward the Aleph, as if to
say, "One is his name." [The Book of Letters, Rabbi Kushner]
"Why does the Torah begin with the letter Beth, which corresponds
to the number 2? Because our Sages teach that God created not one
world, but two. There is OVLM HZH, this world, and OVLM HBA, the
world to come. Our life must always be lived with the awareness
that the grave is not our end, but merly the second beginning."
[The Secrets of the Hebrew Words, Rabbi Blech].
As a preposition beth means: in, at; among, with, by means of,
through, against. It suggest movement from a point without to a
point within.
The Hieroglyph for Beth has been lost, as the square letters
employed today are of comparative recent invention. Perhaps the
first idea that will be suggested to most people be all arrow-head
is sharpness. Then since every Hebrew letter stands for a kind of
consciousness, Beth must be a sign of mental acuteness, or
penetration. It represents the sort of intelligence that manifest
itself in quick perception, accurate observation, keen
discernment, sagacity, and the like. An arrowhead is a point,
denoting position. In logical 'position' means affirmation or
assertion, As when we speak of 'the proof of a position,' implying
order-is derived. Beth, then represents affirmative mental
activity, limiting its operation to a definite locality, and
exercising itself in establishing order. Hence Beth suggest
initiative, direction, control, the concentration of energy in a
particular field, and its specialization in definite forms. This
idea of concentration is inseparable from the original form of the
letter. The word 'concentrate' is derived from the greek Kentron,
an arrow point. The same Greek work also means the point around
which a circle is inscribed, which shows that it implies the very
notions of definite locality, order, that we have been
considering. The implicates of the letter name are closely related
to those connected with the hieroglyphic. Beth means "house"
suggesting inclosure, limitation, to a special field, definite
locality, and so on. As a House is the dwelling of its owner, so
is the kind of mental action related to Beth the abode of spirit,
because it centers the cosmic mind in a particular, local
expression." [The Secret Doctrine of the Tarot, in the Word, June
1916, pp. 79-80.
The fundamental meaning are related primarily to the Magician and
1, considered as the second aspect of unity. There is no
partition, separation, or distance between the aspects of
consciousness corresponding to 2 and 1 than those corresponding to
1 and 0. Self, sub and superconsciousness are simply 3 levels of
one consciousness. Since 1 is half of 2, the number 2 is the
reflection of the number 1, as 1/1. As the antithesis of 1, the
number 2 represents what is secondary. It is next below the first
in importance, but stands in relation to all numbers following ???
just as 1 stands for 2 or 0 for 1.
As second in a series beginning with 1, 2 represents continuation,
in the sense of carrying onward or extending the initial impulse
symbolized by 1. 2 is therefore an emblem of prolongation, or
lengthening in time or space. Hence, the number wisdom of
Pythagoreans, the line is represented by 2 the point by 1.
The number 2 stands for the non-ego, the inferior nature, the
mysterious working power of the supreme spirit. It is the
arithmetical symbol of result or effect; the moon, the reflection
of sun; of memory; of intellect (Wisdom) and of radiant energy
because it vibrates. Prakriti-the Great Womb or principal thing.
It is female in relation to Kether.
Through me unfailing Wisdom takes form in thought and word.
2 is the symbol of duality, the symbol of the separation of the
sexes, of space-time, etc. Any number with a numerical reduction
of 2 has a characteristic of duality. The number 2 also concerns
Wisdom. superstitious people say that 2 is the number of evil,
which is not accurate. Duality is necessary for manifestation and
consequently it is the first principle to allow for man's
evolution.
Through me its unfailing Wisdom takes form, in thought and word
[Pattern on the Trestleboard].
see 73, 37, 15 as well as numbers which reduce to 2: 29, 11, 38,
47, 56, 65, 74,
AA. An abbreviation for ARIK ANPIN, Arik Anpin, the Vast
Countenance (Kether). see 422, 620.
B. An abbreviation of BN, Ben (52) or BR (202). meaning "son of."
Extremely rare use.
"""

def extract_data(pdf_text):
    entries = []
    current_entry = None

    for match in re.finditer(r'(\d+) \(prime\) (.+?)(?=\d+ \(prime\)|$)', pdf_text, re.DOTALL):
        if current_entry:
            entries.append(current_entry)
        number_id, entry_text = match.groups()
        entry_lines = [line.strip() for line in entry_text.split('\n')]
        
        # Check if there is a line starting with "Names for the number"
        names_match = re.match(r'(.+?)\.\s*(?:Names for the number \d+: (.+?))?(.+)', entry_lines[0])
        if names_match:
            name, number_names, description_start = names_match.groups()
            number_names = number_names.split(', ') if number_names else []
        else:
            name = entry_lines[0]
            number_names = []
            description_start = entry_lines[1]

        description_lines = [description_start] + entry_lines[2:]
        description = ' '.join(description_lines).replace('\"', '')

        # Remove references like [The Alef-Beit, Rabbi Ginsburgh] and extra spaces
        description = re.sub(r'\[.+?\]', '', description).strip()
        
        current_entry = {
            'number_id': int(number_id),
            'is_prime': True,
            'name': name,
            'number_names': number_names,
            'description': [sentence.strip() for sentence in description.split('. ') if sentence.strip()]
        }

    if current_entry:
        entries.append(current_entry)

    return entries

# Extract and organize data
data = extract_data(pdf_text)

# Save data to a JSON file
with open('output.json', 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=4)

print("Data extracted and saved to output.json.")