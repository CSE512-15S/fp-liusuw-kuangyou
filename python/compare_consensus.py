import numpy as np
from Bio import SeqIO


class compare_consensus:
    def __init__(self, name):
        # every position AA frequncy matrix
        self.all_freq = np.genfromtxt("data/subtype_B_GP120_all.csv", delimiter=',', skip_header=1)
        # Header Vector
        self.first_row = np.genfromtxt("data/subtype_B_GP120_all.csv", delimiter=',', dtype=None)[0, :]
        self.offset = 0
        # Mapping between AA and coreponding data
        self.aa_index_map = dict()
        for i in range(1, len(self.first_row)):
            curr = str(self.first_row[i])
            self.aa_index_map[curr] = i

        # Position mapping csv file
        self.fasta_consensus_map = np.genfromtxt("position_mapping/" + name + ".csv", delimiter=',', skip_header=1)
        # First row of Fasta file for consensus
        fasta_file_path = "fasta/" + name + ".fasta"
        self.consensus = next(SeqIO.parse(fasta_file_path, "fasta")).seq

    def get_aa_freq(self, fasta_position, aa):
        if (aa == "-"):
            return 0.0
        subtype_b_postion = int(self.fasta_consensus_map[fasta_position-1][1])
        aa_column = self.aa_index_map[aa]
        return self.all_freq[subtype_b_postion-1][aa_column]

    def get_consensus_aa_freq(self, fasta_position):
        consensus_aa = self.consensus[fasta_position-1]
        return self.get_aa_freq(fasta_position, consensus_aa)
