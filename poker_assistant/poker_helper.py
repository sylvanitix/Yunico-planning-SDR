import PySimpleGUI as sg
from treys import Card, Evaluator, Deck
import numpy as np

class PokerAssistant:
    def __init__(self):
        self.evaluator = Evaluator()
        self.deck = Deck()
        
    def calculate_hand_strength(self, hole_cards, board_cards=[]):
        """Calcule la force de la main actuelle"""
        if not board_cards:  # Preflop
            return self.evaluate_preflop(hole_cards)
        
        score = self.evaluator.evaluate(board_cards, hole_cards)
        return 1 - (score / 7462)  # Normalise le score entre 0 et 1
    
    def evaluate_preflop(self, hole_cards):
        """Évalue la force d'une main preflop"""
        # Conversion des cartes en valeurs
        card1, card2 = Card.get_rank_int(hole_cards[0]), Card.get_rank_int(hole_cards[1])
        suited = Card.get_suit_int(hole_cards[0]) == Card.get_suit_int(hole_cards[1])
        
        # Points de base pour les paires
        if card1 == card2:
            return 0.5 + (card1 * 0.02)  # Plus haute est la paire, meilleur est le score
        
        # Points pour les cartes assorties
        suited_bonus = 0.1 if suited else 0
        
        # Points de base pour les cartes hautes
        high_card = max(card1, card2)
        low_card = min(card1, card2)
        
        # Bonus pour les cartes connectées
        connected_bonus = 0.05 if abs(card1 - card2) == 1 else 0
        
        return (high_card * 0.015 + low_card * 0.01 + suited_bonus + connected_bonus)

    def get_action_recommendation(self, hand_strength, position='middle', pot_odds=None):
        """Donne une recommandation d'action basée sur la force de la main"""
        if hand_strength > 0.8:
            return "RAISE/RELANCE - Main très forte!"
        elif hand_strength > 0.6:
            return "CALL/SUIVRE - Bonne main"
        elif hand_strength > 0.4:
            if position in ['button', 'cutoff']:
                return "CALL/SUIVRE - Position favorable"
            return "CALL avec précaution"
        else:
            if pot_odds and pot_odds > hand_strength:
                return "FOLD/PASSER - Cotes du pot défavorables"
            return "FOLD/PASSER - Main faible"

def create_card_button(key):
    """Crée un bouton pour sélectionner une carte"""
    return sg.Button('Sélectionner', key=key, size=(10, 1))

def main():
    sg.theme('DarkBlue')
    
    layout = [
        [sg.Text('Assistant Poker - Analyseur de Main', size=(30, 1), justification='center', font=('Helvetica', 16))],
        [sg.Text('Vos cartes:')],
        [create_card_button('CARD1'), create_card_button('CARD2')],
        [sg.Text('Cartes sur le board:')],
        [create_card_button('BOARD1'), create_card_button('BOARD2'), 
         create_card_button('BOARD3'), create_card_button('BOARD4'), 
         create_card_button('BOARD5')],
        [sg.Text('Position:'), 
         sg.Combo(['Early', 'Middle', 'Late', 'Button'], default_value='Middle', key='POSITION')],
        [sg.Button('Analyser', size=(20, 2))],
        [sg.Text('', size=(40, 2), key='OUTPUT')],
        [sg.Button('Quitter')]
    ]

    window = sg.Window('Poker Assistant', layout, finalize=True)
    assistant = PokerAssistant()
    
    while True:
        event, values = window.read()
        
        if event in (sg.WIN_CLOSED, 'Quitter'):
            break
            
        if event == 'Analyser':
            # Simulation pour l'exemple
            hole_cards = [
                Card.new('Ah'),
                Card.new('Kh')
            ]
            
            strength = assistant.calculate_hand_strength(hole_cards)
            recommendation = assistant.get_action_recommendation(
                strength, 
                position=values['POSITION'].lower()
            )
            
            window['OUTPUT'].update(f'Force de la main: {strength:.2%}\n{recommendation}')
    
    window.close()

if __name__ == '__main__':
    main()
