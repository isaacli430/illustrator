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
 l     ��������  ��  ��        l     ��  ��    R L This script provides a way to select a RANGE of lines, words or paragraphs.     �   �   T h i s   s c r i p t   p r o v i d e s   a   w a y   t o   s e l e c t   a   R A N G E   o f   l i n e s ,   w o r d s   o r   p a r a g r a p h s .      l     ��  ��    S M In order to do so, you must find the character offset of the first character     �   �   I n   o r d e r   t o   d o   s o ,   y o u   m u s t   f i n d   t h e   c h a r a c t e r   o f f s e t   o f   t h e   f i r s t   c h a r a c t e r      l     ��  ��    d ^ of the range, and the last character of the range, then select the range of those characters.     �   �   o f   t h e   r a n g e ,   a n d   t h e   l a s t   c h a r a c t e r   o f   t h e   r a n g e ,   t h e n   s e l e c t   t h e   r a n g e   o f   t h o s e   c h a r a c t e r s .      l     ��  ��    X R Simply setting the selection to a range of lines, words or paragraphs won't work.     �   �   S i m p l y   s e t t i n g   t h e   s e l e c t i o n   t o   a   r a n g e   o f   l i n e s ,   w o r d s   o r   p a r a g r a p h s   w o n ' t   w o r k .     !   l     ��������  ��  ��   !  " # " l     �� $ %��   $ V P NOTE: You must have a text frame with at least 3 lines of text in the document.    % � & & �   N O T E :   Y o u   m u s t   h a v e   a   t e x t   f r a m e   w i t h   a t   l e a s t   3   l i n e s   o f   t e x t   i n   t h e   d o c u m e n t . #  ' ( ' l     ��������  ��  ��   (  ) * ) l     ��������  ��  ��   *  +�� + l    � ,���� , O     � - . - Z    � / 0�� 1 / I   �� 2��
�� .coredoexbool        obj  2 4    �� 3
�� 
docu 3 m    ���� ��   0 Z    | 4 5�� 6 4 I   �� 7��
�� .coredoexbool        obj  7 n     8 9 8 4    �� :
�� 
cTXa : m    ����  9 4    �� ;
�� 
docu ; m    ���� ��   5 k    t < <  = > = r    , ? @ ? I   *�� A��
�� .corecnte****       **** A n    & B C B 2  $ &��
�� 
clin C n    $ D E D 4   ! $�� F
�� 
cTXa F m   " #����  E 4    !�� G
�� 
docu G m     ���� ��   @ o      ���� 0 	linecount 	lineCount >  H�� H Z   - t I J�� K I @  - 0 L M L o   - .���� 0 	linecount 	lineCount M m   . /����  J k   3 l N N  O P O r   3 D Q R Q n   3 B S T S 1   @ B��
�� 
pSTR T n   3 @ U V U 4 = @�� W
�� 
cha  W m   > ?����  V n   3 = X Y X 4   : =�� Z
�� 
clin Z m   ; <����  Y n   3 : [ \ [ 4   7 :�� ]
�� 
cTXa ] m   8 9����  \ 4   3 7�� ^
�� 
docu ^ m   5 6����  R o      ����  0 firstselection firstSelection P  _ ` _ r   E V a b a n   E T c d c 1   R T��
�� 
pSTR d n   E R e f e 4  O R�� g
�� 
cha  g m   P Q������ f n   E O h i h 4   L O�� j
�� 
clin j m   M N����  i n   E L k l k 4   I L�� m
�� 
cTXa m m   J K����  l 4   E I�� n
�� 
docu n m   G H����  b o      ���� 0 lastselection lastSelection `  o�� o r   W l p q p n   W h r s r 7  ^ h�� t u
�� 
cha  t o   b d����  0 firstselection firstSelection u o   e g���� 0 lastselection lastSelection s n   W ^ v w v 4   [ ^�� x
�� 
cTXa x m   \ ]����  w 4   W [�� y
�� 
docu y m   Y Z����  q 1   h k��
�� 
sele��  ��   K I  o t�� z��
�� .sysodisAaleR        TEXT z m   o p { { � | | v S c r i p t   r e q u i r e s   a t   l e a s t   3   l i n e s   o f   t e x t   i n   t h e   t e x t   f r a m e .��  ��  ��   6 I  w |�� }��
�� .sysodisAaleR        TEXT } m   w x ~ ~ �   x P l e a s e   a d d   a   t e x t   f r a m e   c o n t a i n i n g   a t   l e a s t   3   l i n e s   o f   t e x t .��  ��   1 I   ��� ���
�� .sysodisAaleR        TEXT � m    � � � � � � � P l e a s e   o p e n   a   d o c u m e n t   a n d   a d d   a   t e x t   f r a m e   c o n t a i n i n g   a t   l e a s t   3   l i n e s   o f   t e x t .��   . m      � �                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��  ��  ��  ��       �� � ���   � ��
�� .aevtoappnull  �   � **** � �� ����� � ���
�� .aevtoappnull  �   � **** � k     � � �  +����  ��  ��   �   �  ����������������������� {�� ~ �
�� 
docu
�� .coredoexbool        obj 
�� 
cTXa
�� 
clin
�� .corecnte****       ****�� 0 	linecount 	lineCount
�� 
cha 
�� 
pSTR��  0 firstselection firstSelection�� 0 lastselection lastSelection
�� 
sele
�� .sysodisAaleR        TEXT�� �� �*�k/j  r*�k/�k/j  \*�k/�k/�-j E�O�m >*�k/�k/�l/�k/�,E�O*�k/�k/�m/�i/�,E�O*�k/�k/[�\[Z�\Z�2*�,FY �j Y �j Y �j Uascr  ��ޭ