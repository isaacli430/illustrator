FasdUAS 1.101.10   ��   ��    k             l      ��  ��   *********************************************************

ADOBE SYSTEMS INCORPORATED 
Copyright 2005-2010 Adobe Systems Incorporated 
All Rights Reserved 

NOTICE:  Adobe permits you to use, modify, and 
distribute this file in accordance with the terms
of the Adobe license agreement accompanying it.  
If you have received this file from a source 
other than Adobe, then your use, modification,
or distribution of it requires the prior 
written permission of Adobe. 

********************************************************     � 	 	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 
 A D O B E   S Y S T E M S   I N C O R P O R A T E D   
 C o p y r i g h t   2 0 0 5 - 2 0 1 0   A d o b e   S y s t e m s   I n c o r p o r a t e d   
 A l l   R i g h t s   R e s e r v e d   
 
 N O T I C E :     A d o b e   p e r m i t s   y o u   t o   u s e ,   m o d i f y ,   a n d   
 d i s t r i b u t e   t h i s   f i l e   i n   a c c o r d a n c e   w i t h   t h e   t e r m s 
 o f   t h e   A d o b e   l i c e n s e   a g r e e m e n t   a c c o m p a n y i n g   i t .     
 I f   y o u   h a v e   r e c e i v e d   t h i s   f i l e   f r o m   a   s o u r c e   
 o t h e r   t h a n   A d o b e ,   t h e n   y o u r   u s e ,   m o d i f i c a t i o n , 
 o r   d i s t r i b u t i o n   o f   i t   r e q u i r e s   t h e   p r i o r   
 w r i t t e n   p e r m i s s i o n   o f   A d o b e .   
 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *   
  
 l     ��������  ��  ��        l     ��  ��    P J The following script will find all page items that intersect the selected     �   �   T h e   f o l l o w i n g   s c r i p t   w i l l   f i n d   a l l   p a g e   i t e m s   t h a t   i n t e r s e c t   t h e   s e l e c t e d      l     ��  ��    O I page item. This script uses geometric bounds, but can always be replaced     �   �   p a g e   i t e m .   T h i s   s c r i p t   u s e s   g e o m e t r i c   b o u n d s ,   b u t   c a n   a l w a y s   b e   r e p l a c e d      l     ��  ��    I C with visible bounds if that suits your needs better (ie, take into     �   �   w i t h   v i s i b l e   b o u n d s   i f   t h a t   s u i t s   y o u r   n e e d s   b e t t e r   ( i e ,   t a k e   i n t o      l     ��  ��    , & consideration the stroke width, etc).     �   L   c o n s i d e r a t i o n   t h e   s t r o k e   w i d t h ,   e t c ) .     !   l     ��������  ��  ��   !  " # " l     �� $ %��   $ L F NOTE: There is a bug affecting this script, bug #1858236. This script    % � & & �   N O T E :   T h e r e   i s   a   b u g   a f f e c t i n g   t h i s   s c r i p t ,   b u g   # 1 8 5 8 2 3 6 .   T h i s   s c r i p t #  ' ( ' l     �� ) *��   ) M G fails randomly and becomes corrupted. It is advised to make a copy of     * � + + �   f a i l s   r a n d o m l y   a n d   b e c o m e s   c o r r u p t e d .   I t   i s   a d v i s e d   t o   m a k e   a   c o p y   o f   (  , - , l     �� . /��   . "  this script before running.    / � 0 0 8   t h i s   s c r i p t   b e f o r e   r u n n i n g . -  1 2 1 l     ��������  ��  ��   2  3 4 3 l     5���� 5 r      6 7 6 J     ����   7 o      ���� 0 itemlist itemList��  ��   4  8 9 8 l     ��������  ��  ��   9  : ; : l   h <���� < O    h = > = Z   	 g ? @���� ? l  	   A���� A F   	   B C B l  	  D���� D ?   	  E F E l  	  G���� G I  	 �� H��
�� .corecnte****       **** H 2  	 ��
�� 
docu��  ��  ��   F m    ����  ��  ��   C l    I���� I >     J K J n     L M L 1    ��
�� 
sele M 4    �� N
�� 
docu N m    ����  K J    ����  ��  ��  ��  ��   @ k   # c O O  P Q P r   # . R S R n   # , T U T 4   ) ,�� V
�� 
cobj V m   * +����  U n   # ) W X W 1   ' )��
�� 
sele X 4   # '�� Y
�� 
docu Y m   % &����  S o      ���� 0 
targetitem 
targetItem Q  Z [ Z r   / O \ ] \ n   / 2 ^ _ ^ 1   0 2��
�� 
aiBG _ o   / 0���� 0 
targetitem 
targetItem ] J       ` `  a b a o      ���� 0 
targetleft 
targetLeft b  c d c o      ���� 0 	targettop 	targetTop d  e f e o      ���� 0 targetright targetRight f  g�� g o      ���� 0 targetbottom targetBottom��   [  h�� h r   P c i j i 6  P a k l k n   P V m n m 2  T V��
�� 
caAT n 4   P T�� o
�� 
docu o m   R S����  l =  W ` p q p 1   X \��
�� 
selc q m   ] _��
�� boovfals j o      ���� 0 itemlist itemList��  ��  ��   > m     r r                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��  ��  ��   ;  s t s l     ��������  ��  ��   t  u v u l  i o w���� w r   i o x y x J   i k����   y o      ���� $0 intersectionlist intersectionList��  ��   v  z { z l     ��������  ��  ��   {  | } | l  p y ~���� ~ r   p y  �  I  p u�� ���
�� .corecnte****       **** � o   p q���� 0 itemlist itemList��   � o      ���� 0 	itemcount 	itemCount��  ��   }  � � � l     ��������  ��  ��   �  � � � l  z& ����� � Y   z& ��� � ��� � k   �! � �  � � � O   � � � � � r   � � � � � n   � � � � � 1   � ���
�� 
aiBG � n   � � � � � 4   � ��� �
�� 
cobj � o   � ����� 0 i   � o   � ����� 0 itemlist itemList � J       � �  � � � o      ���� 0 itemleft itemLeft �  � � � o      ���� 0 itemtop itemTop �  � � � o      ���� 0 	itemright 	itemRight �  ��� � o      ���� 0 
itembottom 
itemBottom��   � m   � � � �                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��   �  � � � l  � ���������  ��  ��   �  � � � Z   � � ����� � G   � � � � l 
 � � ����� � l  � � ����� � F   � � � � � F   � � � � � F   � � � � � B   � � � � � o   � ����� 0 
targetleft 
targetLeft � o   � ����� 0 	itemright 	itemRight � @   � � � � � o   � ����� 0 	targettop 	targetTop � o   � ����� 0 
itembottom 
itemBottom � @   � � � � � o   � ����� 0 targetright targetRight � o   � ����� 0 itemleft itemLeft � B   � � � � � o   � ����� 0 targetbottom targetBottom � o   � ����� 0 itemtop itemTop��  ��  ��  ��   � l  �  ����� � F   �  � � � F   � � � � � F   � � � � � @   � � � � � o   � ����� 0 
targetleft 
targetLeft � o   � ����� 0 	itemright 	itemRight � B   � � � � � o   � ����� 0 	targettop 	targetTop � o   � ����� 0 
itembottom 
itemBottom � B   � � � � � o   � ����� 0 targetright targetRight � o   � ����� 0 itemleft itemLeft � @   � � � � � o   � ����� 0 targetbottom targetBottom � o   � ����� 0 itemtop itemTop��  ��   � r   � � � n  	 � � � 4  	�� �
�� 
cobj � o  ���� 0 i   � o  ���� 0 itemlist itemList � n       � � �  ;   � o  	���� $0 intersectionlist intersectionList��  ��   �  �� � O ! � � � r    � � � n   � � � 2  �~
�~ 
cobj � o  �}�} $0 intersectionlist intersectionList � 1  �|
�| 
sele � m   � �                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��  �  �� 0 i   � m   } ~�{�{  � o   ~ ��z�z 0 	itemcount 	itemCount��  ��  ��   �  � � � l     �y�x�w�y  �x  �w   �  � � � l     �v�u�t�v  �u  �t   �  ��s � l     �r�q�p�r  �q  �p  �s       �o � ��o   � �n
�n .aevtoappnull  �   � **** � �m ��l�k � ��j
�m .aevtoappnull  �   � **** � k    & � �  3 � �  : � �  u � �  | � �  ��i�i  �l  �k   � �h�h 0 i   � �g r�f�e�d�c�b�a�`�_�^�]�\�[�Z ��Y�X�W�V�U�T�S�g 0 itemlist itemList
�f 
docu
�e .corecnte****       ****
�d 
sele
�c 
bool
�b 
cobj�a 0 
targetitem 
targetItem
�` 
aiBG�_ 0 
targetleft 
targetLeft�^ 0 	targettop 	targetTop�] 0 targetright targetRight�\ �[ 0 targetbottom targetBottom
�Z 
caAT �  
�Y 
selc�X $0 intersectionlist intersectionList�W 0 	itemcount 	itemCount�V 0 itemleft itemLeft�U 0 itemtop itemTop�T 0 	itemright 	itemRight�S 0 
itembottom 
itemBottom�j'jvE�O� `*�-j j	 *�k/�,jv�& E*�k/�,�k/E�O��,E[�k/E�Z[�l/E�Z[�m/E�Z[��/E�ZO*�k/�-�[a ,\Zf81E�Y hUOjvE` O�j E` O �k_ kh  � -��/�,E[�k/E` Z[�l/E` Z[�m/E` Z[��/E` ZUO�_ 	 	�_ �&	 	�_ �&	 	�_ �&
 '�_ 	 	�_ �&	 	�_ �&	 	�_ �&�& ��/_ 6FY hO� _ �-*�,FU[OY�_ ascr  ��ޭ